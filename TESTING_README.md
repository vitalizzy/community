# 🧪 GUÍA COMPLETA DE TESTING - Proyecto L2H Community

Documentación completa para ejecutar y trackear los 15 escenarios de testing definidos para validar el flujo de registro, onboarding y características del sistema.

---

## 📚 Documentos Disponibles

### 1. **TESTING_SCENARIOS.md**
Define los **15 escenarios de testing** con:
- Objetivo de cada escenario
- Pasos detallados (5-15 pasos cada uno)
- Resultados esperados
- Datos de prueba
- Casos críticos a monitorear

**Escenarios cubiertos:**
1. Registro + Agregar Vivienda
2. Múltiples Viviendas
3. Validaciones
4. Logout sin Vivienda
5. Login con Vivienda
6. Login sin Vivienda (Redirect)
7. Cambiar Contraseña
8. Datos de Contacto (Teléfono Internacional)
9. Recuperar Contraseña
10. Acceso sin Autenticación
11. Tema e Idioma
12. Agregar Vivienda en Perfil
13. Ver Vecinos
14. Eliminar Cuenta
15. Comportamiento Móvil

### 2. **TESTING_REPORT.md**
Template de tracking para registrar resultados:
- Estado de cada escenario (🔴 No Testeado, 🟡 Problemas, 🟢 Pasado)
- Checklist de verificaciones por escenario
- Campo de observaciones
- Tabla resumen de resultados
- Próximos pasos

### 3. **TESTING_EXECUTION.md**
Guía paso-a-paso para ejecutar manualmente:
- Cómo cargar el `testing-helper.js` en consola
- Instrucciones detalladas para cada escenario
- Comandos JavaScript para testing
- Tabla de elementos a verificar
- Solución de problemas

### 4. **testing-helper.js**
Herramienta JavaScript para testing en consola:
- Verificaciones de página y DOM
- Funciones de llenado de formularios
- Queries a Supabase
- Logging formateado
- Utilidades generales

### 5. **testing_automation.py**
Script de automatización con Selenium:
- Automatiza Escenarios 1-3 (registro, login, validaciones)
- Navegación automática
- Relleno de formularios
- Verificaciones
- Reportes en JSON

---

## 🚀 Opción 1: Testing Manual (Recomendado para desarrollo)

### Paso 1: Preparar el ambiente

1. Asegúrate de que la aplicación está corriendo localmente:
   ```bash
   # En VS Code, abre Live Server
   # O corre un servidor local en puerto 5500
   python -m http.server 5500
   ```

2. Verifica que Supabase está configurado correctamente en `supabase-config.js`

### Paso 2: Cargar Testing Helper

1. Abre la aplicación en el navegador
2. Abre DevTools (F12 o Ctrl+Shift+I)
3. Ve a la pestaña **Console**
4. Copia y pega este código:

```javascript
// Cargar testing helper
const script = document.createElement('script');
script.src = 'testing-helper.js';
document.head.appendChild(script);
```

5. Deberías ver: `✅ Testing Helper Cargado`

### Paso 3: Ejecutar Escenarios

Sigue las instrucciones en `TESTING_EXECUTION.md`:

```javascript
// Ver guía rápida
test.printTestingSummary()

// Escenario 1
test.testRegisterFormElements()
test.fillRegisterForm('Juan', 'juan@test.com', 'Pass123!')
// ... (seguir pasos en TESTING_EXECUTION.md)
```

### Paso 4: Registrar Resultados

Para cada escenario completado:

1. Abre `TESTING_REPORT.md`
2. Encuentra la sección del escenario
3. Cambia el status a 🟢 PASADO o 🟡 PROBLEMAS
4. Marca los checkboxes completados
5. Agrega observaciones

**Ejemplo:**
```markdown
Escenario 1: Registro Nuevo Usuario + Agregar Vivienda
Status: 🟢 PASADO

Checklist:
✅ Página de registro carga correctamente
✅ Todos los campos se rellenan sin errores
✅ Registro se envía correctamente
...

Observaciones:
- Registro completado exitosamente
- Tiempos de respuesta aceptables
```

---

## 🤖 Opción 2: Testing Automatizado (Para CI/CD)

### Requisitos

```bash
# Instalar dependencias
pip install selenium webdriver-manager pytest python-dotenv
```

### Ejecución

```bash
# Método 1: Script directo
python testing_automation.py

# Método 2: Con pytest (más control)
pytest testing_automation.py -v

# Método 3: Con reportes
pytest testing_automation.py -v --html=report.html
```

### Salida

El script genera:
- Logs en consola con timestamps
- Archivo JSON con resultados: `test_results_YYYYMMDD_HHMMSS.json`
- Resumen con tasa de éxito

**Ejemplo de JSON:**
```json
[
  {
    "scenario": "Escenario 1",
    "status": "PASADO",
    "details": "Usuario registrado: juan.garcia.12345@example.com",
    "timestamp": "2024-01-15T14:30:45.123456"
  }
]
```

---

## 📋 Flujo de Testing Completo

### Día 1: Escenarios Base (Prioridad CRÍTICA)

```
1. ✅ Ejecutar Escenario 1: Registro + Onboarding
   └─ Valida: registro, redirección, agregación de vivienda

2. ✅ Ejecutar Escenario 2: Múltiples Viviendas
   └─ Valida: escalabilidad, gestión de múltiples propiedades

3. ✅ Ejecutar Escenario 3: Validaciones
   └─ Valida: rechazos de datos inválidos

4. ✅ Ejecutar Escenario 4: Logout sin Vivienda
   └─ Valida: manejo de estado incompleto

5. ✅ Ejecutar Escenario 5: Login con Vivienda
   └─ Valida: autenticación exitosa

6. ✅ Ejecutar Escenario 6: Login sin Vivienda (Redirect)
   └─ Valida: protección de rutas críticas
```

### Día 2: Escenarios de Características (Prioridad MEDIA)

```
7. ⏳ Ejecutar Escenario 7: Cambiar Contraseña
8. ⏳ Ejecutar Escenario 8: Datos de Contacto
9. ⏳ Ejecutar Escenario 9: Recuperar Contraseña
10. ⏳ Ejecutar Escenario 10: Acceso sin Auth (Security)
```

### Día 3: Escenarios de UX/Accesibilidad (Prioridad NORMAL)

```
11. ⏳ Ejecutar Escenario 11: Tema e Idioma
12. ⏳ Ejecutar Escenario 12: Agregar Vivienda en Perfil
13. ⏳ Ejecutar Escenario 13: Ver Vecinos
14. ⏳ Ejecutar Escenario 14: Eliminar Cuenta
15. ⏳ Ejecutar Escenario 15: Comportamiento Móvil
```

---

## 🔍 Verificaciones Clave por Escenario

### Escenarios Base (1-6)

| Escenario | Verificación Principal | Archivo Clave |
|-----------|----------------------|---------------|
| 1 | Registro → Onboarding → Dashboard | register.js, onboarding-properties.js |
| 2 | Múltiples viviendas en BD | propiedades_adicionales table |
| 3 | Validaciones de input | register.js, onboarding-properties.js |
| 4 | Logout desde onboarding | onboarding-properties.js |
| 5 | Login y acceso a dashboard | login.js, dashboard-auth.js |
| 6 | Login sin vivienda → Redirect | dashboard-auth.js |

### Escenarios de Características (7-10)

| Escenario | Verificación Principal | Archivo Clave |
|-----------|----------------------|---------------|
| 7 | Cambio de contraseña en Supabase | dashboard.html (perfil) |
| 8 | Validación de teléfono internacional | international-phone.js |
| 9 | Reset password via email | Supabase Auth |
| 10 | Acceso denegado sin auth | Todas las páginas protegidas |

### Escenarios UX/Accesibilidad (11-15)

| Escenario | Verificación Principal | Archivo Clave |
|-----------|----------------------|---------------|
| 11 | Tema y lenguaje persisten | theme.js, translations.js |
| 12 | UI permite agregar más propiedades | dashboard.html perfil |
| 13 | Lista de vecinos funciona | dashboard.html, datos de propiedades |
| 14 | Eliminación de cuenta en Supabase | Supabase Auth + triggers |
| 15 | Responsive en móvil (375px) | Todos los CSS + HTML |

---

## 📊 Tracking de Progreso

### Estado Inicial
```
Status: 🔴 NO TESTEADO
├─ Escenarios: 0/15 completados
├─ Tasa de éxito: 0%
└─ Últimas pruebas: Nunca
```

### Después de Día 1 (Escenarios Base)
```
Status: 🟡 PROGRESO
├─ Escenarios: 6/15 completados (40%)
├─ Tasa de éxito: 85-95%
└─ Últimas pruebas: [Timestamp]
```

### Después de Día 2 (Características)
```
Status: 🟡 PROGRESO
├─ Escenarios: 10/15 completados (67%)
├─ Tasa de éxito: 80-90%
└─ Últimas pruebas: [Timestamp]
```

### Final (Todos Completados)
```
Status: 🟢 COMPLETADO
├─ Escenarios: 15/15 completados (100%)
├─ Tasa de éxito: 95%+
└─ Últimas pruebas: [Timestamp]
```

---

## 🐛 Manejo de Problemas

### Si un test falla:

1. **Documenta el error en TESTING_REPORT.md:**
   ```markdown
   Escenario N: [Nombre]
   Status: 🟡 PROBLEMAS
   
   Problema encontrado:
   - [Descripción clara del problema]
   - Paso donde falla: [Paso exacto]
   - Comportamiento esperado: [Qué debería pasar]
   - Comportamiento actual: [Qué está pasando]
   ```

2. **Crea un issue en GitHub** (si usas GitHub):
   ```
   Título: [TESTING] Escenario N - Descripción del error
   
   Descripción:
   - Escenario: N
   - Paso: X
   - Error: [descripción]
   - Reproducible: Sí/No
   - Navegador: Chrome/Firefox/etc
   ```

3. **Investiga la causa:**
   ```javascript
   // En consola, durante el error
   test.log('Investigando error...', 'warning')
   test.checkSupabaseConnection()
   test.checkUserData()
   console.log(error.message)
   ```

4. **Reporta y repite:**
   - Marca como 🟡 PROBLEMAS
   - Espera a que se arregle
   - Repite el test

---

## 🔄 Re-Testing Después de Fixes

Después de corregir un error:

1. **Rerun el escenario que falló:**
   ```javascript
   // Si es Escenario 3
   // Sigue los pasos de TESTING_EXECUTION.md nuevamente
   ```

2. **Verifica solo el paso que falló:**
   ```javascript
   // Enfócate en el componente que fue arreglado
   test.checkCurrentPage()
   test.testSpecificElement() // Tu verificación
   ```

3. **Actualiza TESTING_REPORT.md:**
   - Cambia status a 🟢 PASADO
   - Agrrega nota: "Retest después de fix [descripción]"

---

## 📈 Métricas Importantes

### A rastrear por escenario:

- **Tasa de éxito:** % de verificaciones que pasan
- **Tiempo de ejecución:** Cuánto tarda en completar
- **Errores encontrados:** Cantidad de bugs
- **Comentarios:** Notas sobre comportamiento

### Métricas globales:

- **Cobertura:** 15/15 escenarios (100%)
- **Tasa de éxito global:** Promedio de todos
- **Bugs críticos:** Bloquean flujo principal
- **Bugs menores:** Problemas estéticos/UX

---

## 📞 Referencia Rápida

### Archivos Testing
- 📄 TESTING_SCENARIOS.md - Definición de escenarios
- 📄 TESTING_REPORT.md - Tracking de resultados
- 📄 TESTING_EXECUTION.md - Instrucciones paso-a-paso
- 🐍 testing_automation.py - Automatización Selenium
- 🟡 testing-helper.js - Helper para consola

### Archivos de Aplicación
- 📱 register.html - Página de registro
- 📱 onboarding-properties.html - Onboarding
- 📱 dashboard.html - Dashboard principal
- 📱 login.html - Página de login
- ⚙️ supabase-config.js - Configuración

### URLs Locales
- 🌐 http://localhost:5500/register.html
- 🌐 http://localhost:5500/onboarding-properties.html
- 🌐 http://localhost:5500/login.html
- 🌐 http://localhost:5500/dashboard.html

### Comandos Testing Helper
```javascript
test.checkCurrentPage()                    // Ver página actual
test.checkIfAuthenticated()               // Ver si hay usuario
test.checkUserData()                      // Datos del usuario
test.checkPropietarioData()              // Datos del propietario
test.checkPropiedadesAdicionales()       // Propiedades adicionales
test.fillRegisterForm(n, e, p)           // Llenar registro
test.fillPropertyForm(b, po, pl, l, t)   // Llenar vivienda
test.clickElement(selector, desc)        // Click en elemento
test.log(msg, type)                      // Loguear mensaje
```

---

## ✅ Checklist de Completación

- [ ] Todos los 15 escenarios ejecutados
- [ ] TESTING_REPORT.md completamente rellenado
- [ ] 0 bugs críticos encontrados (o documentados)
- [ ] Tasa de éxito > 95%
- [ ] Todos los datos guardados en Supabase
- [ ] Testeado en al menos 2 navegadores
- [ ] Testeado en al menos dispositivo móvil
- [ ] Documentación actualizada
- [ ] Issues resueltos
- [ ] Producción lista para deploy

---

## 📚 Recursos Adicionales

### Documentación Supabase
- https://supabase.com/docs
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/database

### DevTools Tips
- F12 - Abrir Developer Tools
- Ctrl+Shift+I - Abrir DevTools
- Ctrl+Shift+J - Abrir Console
- Ctrl+Shift+E - Abrir Network
- Ctrl+Shift+C - Inspector de elementos

### Comandos Útiles en Console
```javascript
// Ver usuario autenticado
supabase.auth.getUser()

// Ver sesión
supabase.auth.getSession()

// Ver tablas Supabase
supabase.from('propietarios').select('*')

// Limpiar localStorage
localStorage.clear()

// Limpiar sesión
supabase.auth.signOut()
```

---

**Versión:** 1.0  
**Última actualización:** 2024  
**Estado:** ✅ Listo para testing
