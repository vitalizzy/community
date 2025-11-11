# INSTRUCCIONES DE TESTING - Ejecución Paso a Paso

## 📋 Introducción

Este documento proporciona instrucciones detalladas para ejecutar manualmente los 15 escenarios de testing documentados en `TESTING_SCENARIOS.md`. Incluye el uso del `testing-helper.js` para facilitar las verificaciones.

---

## 🛠 Configuración Inicial

### Paso 1: Cargar Testing Helper en Console

1. Abre el navegador y navega a cualquier página de la aplicación
2. Abre la Developer Console (F12 o Ctrl+Shift+I)
3. Ve a la pestaña **Console**
4. Copia y pega el siguiente código:

```javascript
// Cargar testing helper
const script = document.createElement('script');
script.src = 'testing-helper.js';
document.head.appendChild(script);
```

5. O simplemente copia el contenido completo de `testing-helper.js` en la console

6. Deberías ver: `✅ Testing Helper Cargado`

### Paso 2: Verificar Setup Inicial

Ejecuta en console:
```javascript
test.printTestingSummary()
```

Deberías ver la guía rápida de testing.

---

## ✅ ESCENARIO 1: Registro Nuevo Usuario + Agregar Vivienda

### Objetivo
Validar que un usuario nuevo pueda registrarse completamente y agregar su primera vivienda.

### Pasos de Ejecución

#### 1.1 Preparar Test

```javascript
// Genera un email único para cada test
const timestamp = Date.now();
const testEmail = `test.user.${timestamp}@example.com`;
console.log(`Email de test: ${testEmail}`);
```

#### 1.2 Navegar a Página de Registro

- Abre `register.html` en el navegador
- O ejecuta: `window.location.href = 'register.html'`

#### 1.3 Verificar Elementos del Formulario

```javascript
test.testRegisterFormElements()
```

**Resultado esperado:**
- ✅ Nombre: ENCONTRADO
- ✅ Email: ENCONTRADO
- ✅ Contraseña: ENCONTRADO
- ✅ Confirmar Contraseña: ENCONTRADO
- ✅ GDPR Checkbox: ENCONTRADO
- ✅ Botón Registrarse: ENCONTRADO
- ✅ Alerta: ENCONTRADO

#### 1.4 Llenar Formulario de Registro

```javascript
// Reemplaza con tus datos
const testEmail = 'juan.garcia.1234@example.com';
test.fillRegisterForm('Juan García', testEmail, 'TestPassword123!');
```

#### 1.5 Enviar Formulario

```javascript
test.clickElement('#registerBtn', 'botón Registrarse');
```

**Verificaciones manuales:**
- ⏳ Espera 2-3 segundos
- ✅ Verifica que veas un mensaje de éxito
- ✅ Verifica que seas redirigido a `onboarding-properties.html`

#### 1.6 Verificar Página de Onboarding

```javascript
// Espera a que cargue la página (2-3 segundos)
test.checkCurrentPage()
test.testOnboardingPageElements()
```

**Resultado esperado:**
- ✅ Página actual: `onboarding-properties.html`
- ✅ Todos los elementos encontrados

#### 1.7 Llenar Formulario de Vivienda

```javascript
test.fillPropertyForm('2', '1', '1', 'A', 'Dueno')
```

#### 1.8 Agregar Vivienda

```javascript
test.clickElement('#addPropertyBtn', 'botón Agregar Vivienda');
```

**Verificaciones manuales:**
- ⏳ Espera 1-2 segundos
- ✅ Verifica que aparezca un mensaje de éxito
- ✅ Verifica que la vivienda aparezca en la lista

#### 1.9 Continuar al Dashboard

```javascript
test.clickElement('#continueBtn', 'botón Continuar al Dashboard');
```

**Verificaciones manuales:**
- ⏳ Espera 2-3 segundos
- ✅ Verifica que seas redirigido a `dashboard.html`

#### 1.10 Verificar Datos en Dashboard

```javascript
// Espera a que cargue el dashboard (3-5 segundos)
test.checkCurrentPage()
test.testDashboardElements()
test.checkPropietarioData()
```

**Resultado esperado:**
- ✅ Página actual: `dashboard.html`
- ✅ Todos los elementos encontrados
- ✅ Propietario encontrado con datos correctos

### Registro en Testing Report

En `TESTING_REPORT.md`, sección **Escenario 1**:

```
Escenario 1: Registro Nuevo Usuario + Agregar Vivienda
Status: 🟢 PASADO

Checklist:
✅ Página de registro carga correctamente
✅ Todos los campos se rellenan sin errores
✅ Registro se envía correctamente
✅ Redirección a onboarding es inmediata
✅ Página de onboarding carga correctamente
✅ Formulario de vivienda se rellena sin errores
✅ Vivienda se agrega a la lista
✅ Botón Continuar aparece después de agregar vivienda
✅ Redirección a dashboard es correcta
✅ Datos del propietario se guardan correctamente
✅ Dashboard muestra la vivienda registrada
✅ El usuario puede cerrar sesión desde dashboard

Observaciones:
- Registro completado exitosamente
- Todos los pasos funcionaron como se esperaba
- Tiempos de respuesta aceptables
```

---

## ✅ ESCENARIO 2: Múltiples Viviendas

### Objetivo
Validar que un usuario pueda agregar múltiples viviendas después del registro.

### Pasos de Ejecución

#### 2.1 Prerequisito

Debe tener completado Escenario 1 con un usuario registrado.

#### 2.2 Acceder a Página de Onboarding Nuevamente

```javascript
// Opción 1: Navegar directamente
window.location.href = 'onboarding-properties.html';

// Opción 2: Desde dashboard, ir a perfil
test.clickElement('#profileMenuTrigger', 'trigger de perfil');
// Luego buscar opción de "Agregar Vivienda"
```

#### 2.3 Agregar Primera Vivienda Adicional

```javascript
test.fillPropertyForm('3', '2', '2', 'B', 'Inquilino');
test.clickElement('#addPropertyBtn', 'botón Agregar');
```

**Verificaciones manuales:**
- ✅ Vivienda aparece en la lista

#### 2.4 Agregar Segunda Vivienda Adicional

```javascript
test.fillPropertyForm('1', '1', '3', 'C', 'Copropietario');
test.clickElement('#addPropertyBtn', 'botón Agregar');
```

**Verificaciones manuales:**
- ✅ Segunda vivienda aparece en la lista
- ✅ Se muestra la cantidad total de viviendas

#### 2.5 Verificar Base de Datos

```javascript
test.checkSupabaseConnection();
test.checkUserData();
test.checkPropiedadesAdicionales();
```

**Resultado esperado:**
- ✅ Conexión a Supabase exitosa
- ✅ 2 propiedades adicionales encontradas

### Registro en Testing Report

En `TESTING_REPORT.md`, sección **Escenario 2**:

```
Escenario 2: Múltiples Viviendas
Status: 🟢 PASADO

Checklist:
✅ Usuario puede navegar a página de onboarding
✅ Primer vivienda adicional se agrega sin errores
✅ Segunda vivienda adicional se agrega sin errores
✅ Lista muestra todas las viviendas agregadas
✅ Datos se guardan correctamente en Supabase
✅ No hay duplicados en la lista
✅ Botón de continuar funciona correctamente

Observaciones:
- Sistema maneja múltiples viviendas correctamente
- No se encontraron duplicados ni conflictos de datos
```

---

## ✅ ESCENARIO 3: Validaciones de Formulario

### Objetivo
Validar que los formularios rechazen datos inválidos correctamente.

### Pasos de Ejecución

#### 3.1 Prueba de Campos Vacíos en Registro

```javascript
window.location.href = 'register.html';
```

Manualmente:
- Deja todos los campos vacíos
- Haz click en "Registrarse"

**Resultado esperado:**
- ✅ Mensaje de error indicando campos requeridos
- ❌ No se envía el formulario

#### 3.2 Prueba de Contraseñas No Coinciden

Manualmente en `register.html`:
- Nombre: Juan Test
- Email: test@example.com
- Contraseña: TestPass123!
- Confirmar Contraseña: DifferentPass123!
- Haz click en "Registrarse"

**Resultado esperado:**
- ✅ Mensaje de error "Las contraseñas no coinciden"
- ❌ No se envía el formulario

#### 3.3 Prueba de Email Inválido

Manualmente:
- Email: invalidemail
- Contraseña: TestPass123!
- Haz click en "Registrarse"

**Resultado esperado:**
- ✅ Mensaje de error sobre email inválido
- ❌ No se envía el formulario

#### 3.4 Prueba de Email Duplicado

Manualmente:
- Email: juan.garcia.1234@example.com (del Escenario 1)
- Contraseña: TestPass123!
- Haz click en "Registrarse"

**Resultado esperado:**
- ✅ Mensaje de error sobre email existente
- ❌ No se envía el formulario

#### 3.5 Prueba de GDPR no Aceptado

Manualmente en `register.html`:
- Rellena todos los campos correctamente
- ❌ NO marques el checkbox GDPR
- Haz click en "Registrarse"

**Resultado esperado:**
- ✅ Mensaje de error sobre GDPR no aceptado
- ❌ No se envía el formulario

#### 3.6 Prueba de Validaciones en Onboarding

```javascript
window.location.href = 'onboarding-properties.html';
```

Manualmente:
- Intenta agregar vivienda con campos incompletos
- Deja Bloque vacío, rellena otros campos
- Haz click en "Agregar"

**Resultado esperado:**
- ✅ Mensaje de error sobre campos requeridos
- ❌ No se agrega la vivienda

#### 3.7 Prueba de Vivienda Duplicada

Manualmente:
- Intenta agregar la misma vivienda dos veces
- Bloque 2, Portal 1, Planta 1, Letra A, Tipo Dueño
- Haz click en "Agregar" dos veces

**Resultado esperado:**
- ✅ Primera vivienda se agrega
- ✅ Segunda intención muestra error de duplicado
- ❌ No se agrega la vivienda duplicada

### Registro en Testing Report

En `TESTING_REPORT.md`, sección **Escenario 3**:

```
Escenario 3: Validaciones
Status: 🟢 PASADO

Checklist:
✅ Campos vacíos en registro son rechazados
✅ Contraseñas diferentes muestran error
✅ Email inválido es rechazado
✅ Email duplicado es detectado
✅ GDPR no aceptado bloquea registro
✅ Campos incompletos en onboarding son rechazados
✅ Viviendas duplicadas no se permiten
✅ Mensajes de error son claros

Observaciones:
- Validaciones funcionan correctamente
- Mensajes de error son útiles
```

---

## ✅ ESCENARIO 4: Logout sin Vivienda

### Objetivo
Validar el comportamiento cuando un usuario intenta logout sin haber completado onboarding.

### Pasos de Ejecución

#### 4.1 Crear Usuario Sin Vivienda (Alternativo)

Si no deseas completar todo el proceso, puedes:
1. Registrar un usuario normalmente
2. En onboarding, **NO agregar ninguna vivienda**
3. Hacer click en "Logout"

O bien:

#### 4.2 Desde Onboarding

```javascript
// Desde página onboarding-properties.html
test.clickElement('#logoutBtn', 'botón Logout');
```

**Verificaciones manuales:**
- ⏳ Espera 1-2 segundos
- ✅ Redirigido a `login.html`
- ✅ Sesión cerrada

#### 4.3 Verificar Sesión Cerrada

```javascript
test.checkIfAuthenticated();
```

**Resultado esperado:**
- ❌ No hay usuario autenticado

#### 4.4 Intentar Acceder a Dashboard

```javascript
window.location.href = 'dashboard.html';
```

**Verificaciones manuales:**
- ✅ Redirigido a `login.html` (protección de ruta)

### Registro en Testing Report

En `TESTING_REPORT.md`, sección **Escenario 4**:

```
Escenario 4: Logout sin Vivienda
Status: 🟢 PASADO

Checklist:
✅ Botón logout está disponible
✅ Click en logout cierra sesión
✅ Redirigido a login
✅ Usuario no autenticado
✅ Dashboard no es accesible

Observaciones:
- Logout funciona correctamente incluso sin vivienda
- Protección de rutas funciona
```

---

## ✅ ESCENARIO 5: Login con Vivienda

### Objetivo
Validar que un usuario registrado pueda hacer login y acceder al dashboard.

### Pasos de Ejecución

#### 5.1 Navegar a Login

```javascript
window.location.href = 'login.html';
```

#### 5.2 Verificar Elementos

```javascript
test.checkDOMElements({
    'Email Input': '#email',
    'Password Input': '#password',
    'Login Button': '#loginBtn',
    'Forgot Password Link': '#forgotPasswordLink',
    'Register Link': '#registerLink'
});
```

#### 5.3 Llenar y Enviar Login

Manualmente o con código:

```javascript
document.getElementById('email').value = 'juan.garcia.1234@example.com';
document.getElementById('password').value = 'TestPassword123!';
document.getElementById('loginBtn').click();
```

**Verificaciones manuales:**
- ⏳ Espera 2-3 segundos
- ✅ Redirigido a `dashboard.html`
- ✅ Usuario autenticado

#### 5.4 Verificar Estado en Dashboard

```javascript
test.checkIfAuthenticated();
test.checkPropietarioData();
test.testDashboardElements();
```

**Resultado esperado:**
- ✅ Usuario autenticado
- ✅ Propietario data cargado
- ✅ Dashboard muestra datos correctamente

### Registro en Testing Report

En `TESTING_REPORT.md`, sección **Escenario 5**:

```
Escenario 5: Login con Vivienda
Status: 🟢 PASADO

Checklist:
✅ Página de login carga correctamente
✅ Credenciales aceptadas
✅ Redirigido a dashboard
✅ Usuario autenticado
✅ Datos del propietario cargados
✅ Dashboard muestra vivienda

Observaciones:
- Login fluido y rápido
```

---

## ✅ ESCENARIO 6: Login sin Vivienda (Redirect a Onboarding)

### Objetivo
Validar que un usuario sin vivienda sea redirigido a onboarding automáticamente.

### Pasos de Ejecución

#### 6.1 Crear Usuario de Test sin Vivienda

**Opción A:** Modificar base de datos (si tienes acceso Supabase)
- Eliminar registro de propietario para usuario específico

**Opción B:** Usar Supabase CLI (si lo tienes instalado)
```bash
# Conectar a Supabase
supabase db push

# En Supabase dashboard, eliminar propietario
```

#### 6.2 Simular Login sin Vivienda

Para este test, necesitarás:
1. Un email y contraseña de usuario que existe en BD
2. Pero que no tiene registro en tabla `propietarios`

O puedes crear uno manualmente si tienes acceso Supabase.

#### 6.3 Login del Usuario

```javascript
window.location.href = 'login.html';
```

Manualmente:
- Email: (usuario sin vivienda)
- Password: (contraseña)
- Click "Login"

**Verificaciones manuales:**
- ⏳ Espera 2-3 segundos
- ✅ Redirigido a `onboarding-properties.html`
- ✅ NO llega a dashboard

#### 6.4 Completar Onboarding

```javascript
test.fillPropertyForm('5', '3', '2', 'D', 'Dueno');
test.clickElement('#addPropertyBtn', 'agregar');
test.clickElement('#continueBtn', 'continuar');
```

**Verificaciones manuales:**
- ✅ Ahora redirigido a dashboard

### Registro en Testing Report

En `TESTING_REPORT.md`, sección **Escenario 6**:

```
Escenario 6: Login sin Vivienda
Status: 🟢 PASADO

Checklist:
✅ Usuario sin vivienda no accede a dashboard
✅ Redirigido automáticamente a onboarding
✅ Puede completar onboarding
✅ Después accede a dashboard

Observaciones:
- Protección y redirección funcionan correctamente
```

---

## 📊 Formato de Registro General

Para cada escenario completado, actualiza `TESTING_REPORT.md`:

```markdown
Escenario N: [Nombre]
Status: 🟢 PASADO / 🟡 PROBLEMAS / 🔴 NO TESTEADO

Checklist:
✅ Verificación 1
⚠️ Verificación con problema
❌ Verificación fallida

Observaciones:
- Nota 1
- Nota 2
- Problema encontrado: [descripción]

Próximos pasos:
- [Si hay problemas, cómo reportarlos]
```

---

## 🚀 Comandos Rápidos de Testing

### Verificaciones Rápidas

```javascript
// Ver página actual
test.checkCurrentPage()

// Ver estado de autenticación
test.checkIfAuthenticated()

// Ver datos del usuario
test.checkUserData()

// Ver datos del propietario
test.checkPropietarioData()

// Ver propiedades adicionales
test.checkPropiedadesAdicionales()

// Verificar conexión a Supabase
test.checkSupabaseConnection()
```

### Llenado Rápido de Formularios

```javascript
// Registro
test.fillRegisterForm('Nombre', 'email@test.com', 'Password123!')

// Vivienda
test.fillPropertyForm('2', '1', '1', 'A', 'Dueno')
```

### Acciones Rápidas

```javascript
// Click en elementos
test.clickElement('#buttonId', 'descripción del botón')

// Loguear mensajes
test.log('Mensaje', 'info')      // azul
test.log('Éxito', 'success')     // verde
test.log('Error', 'error')       // rojo
test.log('Advertencia', 'warning') // naranja
```

---

## ⚠️ Solución de Problemas

### Problema: "testing-helper.js no se carga"

**Solución:**
1. Verifica que el archivo esté en la raíz del proyecto
2. Copia el código directamente en la console
3. Recarga la página y intenta de nuevo

### Problema: "Supabase client no disponible"

**Solución:**
1. Verifica que `supabase-config.js` está cargado
2. Abre DevTools y ve si hay errores
3. Verifica que el archivo HTML importa `supabase-config.js` correctamente

### Problema: "No hay usuario autenticado"

**Solución:**
1. Verifica que completaste el registro
2. Usa `test.checkIfAuthenticated()` para diagnosticar
3. Si es necesario, haz login nuevamente

### Problema: "Datos no aparecen en Supabase"

**Solución:**
1. Verifica la conexión: `test.checkSupabaseConnection()`
2. Verifica permisos en Supabase (RLS policies)
3. Abre DevTools → Network y ve si hay errores en requests

---

## 📝 Próximos Pasos

1. Ejecuta Escenarios 1-6 como base
2. Documenta resultados en `TESTING_REPORT.md`
3. Si hay problemas, abre issues en GitHub
4. Procede a Escenarios 7-15 (características adicionales)

---

## 📞 Referencia Rápida

**Archivos Testing:**
- `testing-helper.js` - Herramientas de testing
- `TESTING_SCENARIOS.md` - Definición de escenarios
- `TESTING_REPORT.md` - Tracking de resultados
- `TESTING_EXECUTION.md` - Este documento

**Páginas de Aplicación:**
- `register.html` - Registro
- `onboarding-properties.html` - Onboarding
- `login.html` - Login
- `dashboard.html` - Dashboard principal

**Supabase Tables:**
- `propietarios` - Datos del propietario principal
- `propiedades_adicionales` - Propiedades adicionales
- `auth.users` - Usuarios del sistema (automatizado)

---

**Última actualización:** 2024
**Versión:** 1.0
