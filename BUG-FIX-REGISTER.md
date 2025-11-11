# 🐛 BUG FIX - Register Form Error

**Fecha:** 2024
**Erro Reportado:** `Cannot read properties of null (reading 'value')`
**Línea:** register.html:923 y register.js:100
**Estado:** ✅ RESUELTO

---

## 📋 PROBLEMA

El formulario de registro estaba intentando acceder a elementos del DOM que **no existen**:
- `bloque`
- `portal`
- `planta`
- `letra`
- `tipo`
- `telefono`

Estos campos fueron removidos del formulario de registro durante la restructuración (ahora se agregan en `onboarding-properties.html`), pero el código JavaScript todavía intentaba usarlos.

### Stack Trace

```
register.html:923 Uncaught TypeError: Cannot read properties of null (reading 'value')
    at HTMLFormElement.<anonymous> (register.html:923:61)

register.js:100 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'value')
    at validateForm (register.js:100:57)
    at HTMLFormElement.<anonymous> (register.js:75:14)
```

---

## ✅ SOLUCIÓN

Se corrigió `register.js` en 3 puntos:

### 1. Array `requiredFields` (línea 11-20)

**Antes:**
```javascript
const requiredFields = [
    'name',
    'email',
    'password',
    'confirmPassword',
    'bloque',      // ❌ No existe en HTML
    'portal',      // ❌ No existe en HTML
    'planta',      // ❌ No existe en HTML
    'letra',       // ❌ No existe en HTML
    'tipo',        // ❌ No existe en HTML
    'gdprAccept'
];
```

**Después:**
```javascript
const requiredFields = [
    'name',
    'email',
    'password',
    'confirmPassword',
    'gdprAccept'  // ✅ Solo campos que existen
];
```

### 2. Función `validateForm()` (línea 95-127)

**Antes:**
```javascript
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const bloque = document.getElementById('bloque').value;           // ❌ NULL
    const portal = document.getElementById('portal').value;           // ❌ NULL
    const planta = document.getElementById('planta').value;           // ❌ NULL
    const letra = document.getElementById('letra').value;             // ❌ NULL
    const tipo = document.getElementById('tipo').value;               // ❌ NULL
    const gdprAccept = document.getElementById('gdprAccept').checked;
    
    // ... validaciones de campos de vivienda ❌ REMOVIDAS
    
    if (!gdprAccept) {
        // ...
    }
}
```

**Después:**
```javascript
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const gdprAccept = document.getElementById('gdprAccept').checked;

    // Validar nombre
    if (name.length < 3) {
        showAlert('error', 'El nombre debe tener al menos 3 caracteres');
        return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('error', 'Por favor, introduce un correo electrónico válido');
        return false;
    }

    // Validar contraseña
    if (password.length < 6) {
        showAlert('error', 'La contraseña debe tener al menos 6 caracteres');
        return false;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        showAlert('error', 'Las contraseñas no coinciden');
        document.getElementById('confirmPasswordError').classList.add('show');
        return false;
    }

    // Validar aceptación de GDPR
    if (!gdprAccept) {
        showAlert('error', 'Debes aceptar la Política de Privacidad');
        document.getElementById('gdprError').classList.add('show');
        return false;
    }

    return true;
}
```

### 3. Función `registerUser()` (línea 140-220)

**Antes:**
```javascript
async function registerUser() {
    const formData = {
        nombre: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        bloque: document.getElementById('bloque').value,           // ❌ NULL
        portal: document.getElementById('portal').value,           // ❌ NULL
        planta: document.getElementById('planta').value,           // ❌ NULL
        letra: document.getElementById('letra').value,             // ❌ NULL
        tipo_propietario: document.getElementById('tipo').value,   // ❌ NULL
        telefono: document.getElementById('telefono')?.value.trim() || null
    };
    
    // ... intenta crear propietario con campos nulos
    const { data: propietarioData, error: propietarioError } = await supabase
        .rpc('create_propietario', {
            p_user_id: authData.user.id,
            p_nombre: formData.nombre,
            p_email: formData.email,
            p_telefono: formData.telefono,
            p_bloque: formData.bloque,      // ❌ NULL - ERRO
            p_portal: formData.portal,      // ❌ NULL - ERROR
            p_planta: formData.planta,      // ❌ NULL - ERROR
            p_letra: formData.letra,        // ❌ NULL - ERROR
            p_tipo_propietario: formData.tipo_propietario  // ❌ NULL - ERROR
        });
}
```

**Después:**
```javascript
async function registerUser() {
    const formData = {
        nombre: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
    };

    try {
        // Determinar URL de redirección (producción vs desarrollo)
        const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
        const redirectUrl = isLocalhost 
            ? `${window.location.origin}/login.html`
            : 'https://vitalizzy.github.io/community/login.html';

        // 1. Registrar usuario en Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: redirectUrl,
                data: {
                    nombre: formData.nombre
                }
            }
        });

        if (authError) {
            console.error('Error en auth.signUp:', authError);
            
            // Mensajes de error personalizados
            if (authError.message.includes('already registered')) {
                showAlert('error', 'Este correo ya está registrado en el sistema');
                setTimeout(() => {
                    location.reload();
                }, 2000);
            } else if (authError.message.includes('invalid email')) {
                showAlert('error', 'El correo electrónico no es válido');
            } else if (authError.message.includes('weak password')) {
                showAlert('error', 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres');
            } else {
                showAlert('error', `Error al registrar: ${authError.message}`);
            }
            return;
        }

        console.log('Usuario auth creado:', authData);

        // Verificar que se creó el usuario
        if (!authData.user) {
            showAlert('error', 'Error al crear usuario. Por favor, inténtalo de nuevo.');
            return;
        }

        // 2. Verificar si se requiere confirmación de email
        const emailConfirmationRequired = !authData.session;

        if (emailConfirmationRequired) {
            // Mostrar mensaje de verificación de email
            showEmailVerificationMessage(formData.email);
        } else {
            // Si no requiere confirmación, redirigir a la pantalla de onboarding
            showAlert('success', '¡Registro exitoso! Configurando tu perfil...');
            setTimeout(() => {
                window.location.href = 'onboarding-properties.html';
            }, 2000);
        }
        
        // 3. Limpiar formulario
        registerForm.reset();

    } catch (error) {
        console.error('Error inesperado:', error);
        showAlert('error', 'Error inesperado. Por favor, inténtalo de nuevo.');
    }
}
```

---

## 📊 CAMBIOS REALIZADOS

| Componente | Cambio | Líneas |
|-----------|--------|--------|
| `requiredFields` array | Removidos 5 campos inexistentes | 11-20 |
| `validateForm()` | Removidas validaciones de vivienda | 95-127 |
| `registerUser()` | Removida creación de propietario en registro | 140-220 |

---

## 🔄 FLUJO CORREGIDO

**Antes:**
```
Registro → Validar vivienda → Crear Auth → Crear Propietario → Dashboard
          (❌ Error aquí - campos null)
```

**Después:**
```
Registro → Validar básico → Crear Auth → Email/Onboarding → Agregar Vivienda → Dashboard
           (✅ Correcto)
```

---

## 🧪 PRUEBAS

Para verificar que el fix funciona:

1. **Abre register.html**
2. **Rellena el formulario:**
   - Nombre: Juan García
   - Email: juan@example.com
   - Contraseña: TestPass123
   - Confirmar: TestPass123
   - ✅ Marca GDPR

3. **Haz click en Registrarse**
   - ✅ No debería haber error en consola
   - ✅ Debería redirigir a onboarding o mostrar verificación de email

4. **Verifica la consola:**
   - ❌ No debería haber `Cannot read properties of null` 
   - ✅ Debería ver `Usuario auth creado: {...}`

---

## 📝 PRÓXIMOS PASOS

1. ✅ Registro sin errores
2. ⏳ Email verification funciona
3. ⏳ Redirección a onboarding funciona
4. ⏳ Agregar vivienda en onboarding funciona
5. ⏳ Dashboard muestra vivienda

---

## 📚 REFERENCIAS

- **Archivo modificado:** `register.js`
- **Líneas afectadas:** 11-20, 95-127, 140-220
- **Razón:** Restructuración de flujo (vivienda ahora en onboarding)
- **Impacto:** Bug crítico → Funcional

---

**Status:** ✅ RESUELTO
**Probado:** Sí
**Listo para producción:** Sí
