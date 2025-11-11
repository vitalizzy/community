# 🏘️ Integración Supabase - L2H Community

## 📋 Guía de Configuración Paso a Paso

### 1️⃣ Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Haz clic en "New Project"
3. Completa los datos:
   - **Organization**: Crea una nueva o selecciona existente
   - **Name**: `lomas2-community`
   - **Database Password**: Genera una contraseña segura y guárdala
   - **Region**: Europe West (Frankfurt) - o la más cercana
   - **Pricing Plan**: Free (para empezar)
4. Haz clic en "Create new project" y espera 1-2 minutos

### 2️⃣ Obtener Credenciales

1. Una vez creado el proyecto, ve a **Settings** (⚙️) → **API**
2. Copia estos dos valores:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon public** key (es una clave larga)

### 3️⃣ Configurar el Proyecto

1. Abre el archivo `supabase-config.js`
2. Reemplaza estos valores:
   ```javascript
   const SUPABASE_URL = 'TU_SUPABASE_URL_AQUI'; // Pega tu Project URL
   const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY_AQUI'; // Pega tu anon key
   ```

### 4️⃣ Crear la Tabla de Propietarios

1. En Supabase, ve a **SQL Editor** (icono de base de datos)
2. Haz clic en "New query"
3. Copia y pega TODO el contenido del archivo `supabase-schema.sql`
4. Haz clic en "Run" o presiona `Ctrl + Enter`
5. Deberías ver un mensaje de éxito

### 4️⃣.1 Crear la Función de Registro

1. En el mismo **SQL Editor**, crea una nueva query
2. Copia y pega TODO el contenido del archivo `supabase-register-function.sql`
3. Haz clic en "Run" o presiona `Ctrl + Enter`
4. Esta función permite el registro de propietarios sin necesidad de sesión activa

### 4️⃣.2 Crear Tabla de Propiedades Adicionales y Función RPC

1. Estas tablas ya están incluidas en `supabase-schema.sql`
2. Si ejecutaste ese archivo completo, ya están creadas
3. Verifica en **Database** → **Tables** que exista `propiedades_adicionales`
4. También deberías ver una función en **Database** → **Functions** llamada `get_neighbors_for_user_properties`

> **¿Qué hace esto?**
> - Tabla `propiedades_adicionales`: Almacena viviendas adicionales de cada propietario
> - Función `get_neighbors_for_user_properties`: Devuelve todos los vecinos registrados en las mismas viviendas

### 5️⃣ Configurar Autenticación por Email

1. Ve a **Authentication** → **Providers**
2. Busca "Email" y asegúrate de que esté **habilitado**
3. Configuración recomendada:
   - ✅ Enable email confirmations (confirmar email)
   - ✅ Enable email signups (permitir registros)
   - Template de confirmación: usar el predeterminado

### 5️⃣.1 Configurar URLs de Redirección

**IMPORTANTE**: Configura esto para que la confirmación de email redirija correctamente.

1. Ve a **Authentication** → **URL Configuration**
2. Configura las siguientes URLs:

   **Site URL** (URL principal de producción): 
   ```
   https://vitalizzy.github.io/community
   ```
   
   **Redirect URLs** (añade todas estas):
   ```
   https://vitalizzy.github.io/community/**
   https://vitalizzy.github.io/community/login.html
   http://localhost:5500/**
   http://127.0.0.1:5500/**
   http://localhost:5500/login.html
   http://127.0.0.1:5500/login.html
   ```

3. Haz clic en **Save**

> **💡 Importante**: 
> - La URL de producción es `https://vitalizzy.github.io/community/`
> - El código detecta automáticamente si estás en localhost o producción
> - En producción, siempre redirige a GitHub Pages
> - En desarrollo local, redirige a localhost

> **� Flujo de verificación**: Cuando el usuario se registre, verá un mensaje en pantalla pidiéndole que verifique su email. Después de hacer clic en el enlace del correo, será redirigido a `login.html` en la URL de producción.

### 6️⃣ Verificar Políticas de Seguridad (RLS)

1. Ve a **Database** → **Tables** → **propietarios**
2. En la pestaña **Policies**, deberías ver 3 políticas:
   - "Los usuarios pueden ver sus propios datos"
   - "Los usuarios pueden insertar sus propios datos"
   - "Los usuarios pueden actualizar sus propios datos"

### 7️⃣ Probar el Sistema

1. Abre tu proyecto en un navegador local
2. Ve a `register.html`
3. Completa el formulario con **todos los campos obligatorios**:
   - Nombre
   - Email
   - Contraseña
   - **Bloque** (1-8)
   - **Portal** (1-2)
   - **Planta** (Bajo, 1, 2, Ático)
   - **Letra** (A, B, C)
   - Tipo de Propietario
4. Acepta la política de privacidad
5. Haz clic en "Registrarse"

### 8️⃣ Confirmar Email (Importante)

1. Revisa la bandeja de entrada del email que registraste
2. Busca un email de Supabase
3. Haz clic en el link de confirmación
4. Una vez confirmado, ya puedes hacer login

### 9️⃣ Iniciar Sesión

1. Ve a `login.html`
2. Ingresa tu email y contraseña
3. Haz clic en "Iniciar Sesión"
4. Serás redirigido al dashboard

---

## 🔍 Verificación en Supabase

### Ver usuarios registrados:
1. Ve a **Authentication** → **Users**
2. Deberías ver tu usuario con su email

### Ver datos de propietarios:
1. Ve a **Database** → **Table Editor** → **propietarios**
2. Deberías ver una fila con todos tus datos:
   - Nombre, email, bloque, portal, planta, letra, tipo_propietario

---

## 🐛 Solución de Problemas

### Error: "Invalid API credentials"
- Verifica que hayas copiado correctamente `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `supabase-config.js`

### Error: "Email already registered"
- Ese email ya está en uso. Usa otro o elimina el usuario desde Supabase → Authentication → Users

### Error: "Invalid login credentials"
- Email o contraseña incorrectos
- Si olvidaste tu contraseña, puedes resetearla desde Supabase

### No se guardan los datos del propietario
- Verifica que la tabla `propietarios` existe
- Verifica que las políticas RLS estén configuradas correctamente
- Revisa la consola del navegador (F12) para ver errores específicos

### No llega el email de confirmación
- Revisa spam/correo no deseado
- En Supabase Free tier, el email puede tardar unos minutos
- Puedes desactivar la confirmación de email temporalmente en Authentication → Providers → Email → "Enable email confirmations" (desmarcar)

---

## 📊 Estructura de la Base de Datos

### Tabla: `propietarios`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | UUID | Sí | ID único del registro |
| `user_id` | UUID | Sí | Referencia a auth.users |
| `nombre` | TEXT | Sí | Nombre completo |
| `email` | TEXT | Sí | Email (único) |
| `telefono` | TEXT | No | Teléfono de contacto |
| `telefono_confirmado` | BOOLEAN | No | Si el teléfono ha sido verificado |
| `gdpr_consent` | BOOLEAN | No | Si acepta la política GDPR |
| `gdpr_consent_at` | TIMESTAMP | No | Fecha de aceptación GDPR |
| `bloque` | TEXT | Sí | Bloque (1-8) |
| `portal` | TEXT | Sí | Portal (1-2) |
| `planta` | TEXT | Sí | Planta (Bajo, 1, 2, Atico) |
| `letra` | TEXT | Sí | Letra (A, B, C) |
| `tipo_propietario` | TEXT | Sí | Tipo (Dueno, PropertyManager, Inquilino) |
| `created_at` | TIMESTAMP | Automático | Fecha de creación |
| `updated_at` | TIMESTAMP | Automático | Última actualización |

### Tabla: `propiedades_adicionales`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | UUID | Sí | ID único del registro |
| `user_id` | UUID | Sí | Referencia a auth.users |
| `bloque` | TEXT | Sí | Bloque (1-8) |
| `portal` | TEXT | Sí | Portal (1-2) |
| `planta` | TEXT | Sí | Planta (Bajo, 1, 2, Atico) |
| `letra` | TEXT | Sí | Letra (A, B, C) |
| `alias` | TEXT | No | Nombre personalizado (ej: "Apartamento playa") |
| `created_at` | TIMESTAMP | Automático | Fecha de creación |
| `updated_at` | TIMESTAMP | Automático | Última actualización |

### Función RPC: `get_neighbors_for_user_properties`

Devuelve todos los vecinos registrados en las viviendas del usuario actual.

**Parámetros:**
- `p_user_id` (UUID): ID del usuario actual

**Retorna:**
```
{
  propiedad: TEXT,          // "Bloque X - Portal Y - PlantaZ L"
  nombre: TEXT,             // Nombre del vecino
  email: TEXT,              // Email del vecino
  tipo_propietario: TEXT,   // Su tipo de propietario
  es_usuario_actual: BOOLEAN // TRUE si es el usuario actual
}
```

---

## 🔐 Recuperación de Contraseña

### Flujo de Recuperación

L2H implementa un flujo seguro de recuperación de contraseña usando **Supabase Auth**:

#### Página: `forgot-password.html`
**Propósito**: Solicitar un link de recuperación de contraseña

**Flujo del Usuario:**
1. Usuario ingresa su email
2. Hace clic en "Send link" / "Enviar enlace"
3. Supabase envía un email con link de recuperación (válido 24 horas)
4. Usuario ve mensaje de confirmación: "Check your inbox and click the link to reset your password"

**Integración Backend:**
```javascript
// En forgot-password.js
await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://tu-dominio.com/reset-password.html'
});
```

**Validaciones:**
- Email en formato válido
- Usuario existe en la base de datos
- Manejo de límite de tasa (rate limiting) de Supabase
- Mensajes de error amigables en 4 idiomas (ES/EN/FR/DE)

#### Página: `reset-password.html` (próxima)
**Propósito**: Permitir al usuario establecer una nueva contraseña

**Flujo:**
1. Usuario recibe email con link que incluye token de recuperación
2. Link redirige a reset-password.html con token en URL
3. Usuario ingresa nueva contraseña
4. Se valida con Supabase `auth.updateUser({password: newPassword})`
5. Contraseña se actualiza y user se redirige a login

**Nota**: Este archivo aún no está creado, será generado en siguientes fases

### Página: `change-password.html`
**Propósito**: Permitir que usuarios autenticados cambien su contraseña

**Flujo del Usuario:**
1. Usuario navega a change-password.html (página protegida, requiere sesión activa)
2. Ingresa nueva contraseña
3. Confirmador de requisitos en tiempo real:
   - ✓ Mínimo 8 caracteres
   - ✓ Una letra mayúscula
   - ✓ Una letra minúscula
   - ✓ Un número
4. Barra de fortaleza visual (débil/media/fuerte)
5. Confirma contraseña en segundo campo
6. Hace clic en "Change Password" / "Cambiar Contraseña"

**Integración Backend:**
```javascript
// En change-password.js
await supabaseClient.auth.updateUser({
    password: newPassword
});
```

**Validaciones:**
- Autenticación verificada en cargar página
- Contraseña cumple 4 requisitos mínimos
- Ambos campos de contraseña coinciden
- Manejo de errores (sesión expirada, fallo de API)
- Feedback visual en tiempo real (4 idiomas)

### Seguridad del Flujo

**Implementado:**
- ✅ Links de recuperación válidos solo 24 horas
- ✅ Supabase genera tokens con expiración automática
- ✅ Cambio de contraseña requiere sesión autenticada
- ✅ Contraseñas hasheadas con bcrypt por Supabase
- ✅ Validación de requisitos en frontend + backend
- ✅ Manejo de rate limiting para prevenir fuerza bruta

---

## 🔐 Seguridad

- ✅ Row Level Security (RLS) habilitado
- ✅ Usuarios solo pueden ver/editar sus propios datos
- ✅ Validación de campos en formulario y base de datos
- ✅ Contraseñas hasheadas automáticamente por Supabase Auth
- ✅ Confirmación de email opcional

---

## 📝 Próximos Pasos

1. **Personalizar emails**: Ve a Authentication → Email Templates para personalizar los emails de confirmación y recuperación de contraseña
2. **Agregar más funcionalidades**: 
   - Recuperar contraseña
   - Editar perfil
   - Cambiar contraseña
   - Ver otros propietarios del mismo bloque
3. **Desplegar**: Cuando estés listo, despliega tu aplicación en:
   - Netlify (recomendado para SPAs)
   - Vercel
   - GitHub Pages
   - Render

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12 → Console)
2. Revisa los logs en Supabase (Database → Logs)
3. Verifica que todos los campos obligatorios estén completos
4. Asegúrate de que el email esté confirmado

---

¡Tu aplicación L2H Community ya está integrada con Supabase! 🎉
