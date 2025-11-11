# 📚 ÍNDICE DE RECURSOS DE TESTING

## 🎯 Guía Rápida de Inicio

### 1️⃣ OPCIÓN RÁPIDA (Comienza aquí)
```
1. Abre: testing-dashboard.html en tu navegador
2. Lee: TESTING_README.md
3. Sigue: TESTING_EXECUTION.md
```

### 2️⃣ TESTING MANUAL (Paso a paso)
```
1. Carga: testing-helper.js en la consola
2. Lee: TESTING_SCENARIOS.md
3. Sigue: TESTING_EXECUTION.md
4. Registra: TESTING_REPORT.md
```

### 3️⃣ TESTING AUTOMATIZADO (Full automation)
```
1. Instala: pip install selenium webdriver-manager pytest
2. Ejecuta: python testing_automation.py
3. Revisa: test_results_YYYYMMDD_HHMMSS.json
```

---

## 📋 DOCUMENTOS DE TESTING

### 🎓 DOCUMENTACIÓN PRINCIPAL

| Documento | Propósito | Cuándo usar |
|-----------|-----------|------------|
| **TESTING_README.md** | Guía general y conceptos | Primero - para entender todo |
| **TESTING_SCENARIOS.md** | 15 escenarios detallados | Referencia para cada test |
| **TESTING_EXECUTION.md** | Instrucciones paso-a-paso | Mientras ejecutas tests |
| **TESTING_REPORT.md** | Tracking de resultados | Registrar resultados |

### 🛠 HERRAMIENTAS DE TESTING

| Herramienta | Tipo | Uso Principal |
|------------|------|---------------|
| **testing-helper.js** | JavaScript | Testing manual en consola |
| **testing-dashboard.html** | HTML/CSS | Dashboard visual de progreso |
| **testing_automation.py** | Python | Automatización con Selenium |

### 📊 OTROS

| Archivo | Propósito |
|---------|-----------|
| **TESTING_INDEX.md** | Este archivo - referencia rápida |

---

## 🚀 INICIO RÁPIDO POR TIPO DE USUARIO

### Para Tester Manual

```
1. Lee: TESTING_README.md (10 min)
2. Abre: testing-dashboard.html (monitoreo visual)
3. Sigue: TESTING_EXECUTION.md (escenario por escenario)
4. Registra: TESTING_REPORT.md (resultados)
```

**Tiempo total:** 2-4 horas (15 escenarios)

### Para Desarrollador QA

```
1. Entiende: TESTING_SCENARIOS.md (estructura)
2. Implementa: testing_automation.py (o crea tuyo)
3. Ejecuta: pytest testing_automation.py
4. Revisa: test_results_*.json
```

**Tiempo total:** 30 min (automatización)

### Para Product Manager

```
1. Ve: testing-dashboard.html (estado visual)
2. Lee: TESTING_REPORT.md (resultados)
3. Reporta: Bugs encontrados en Issues
```

**Tiempo total:** 10 min (resumen diario)

---

## 📖 GUÍA DE LECTURA POR PRIORIDAD

### 🔴 CRÍTICO - Lee primero

1. **TESTING_README.md** - Conceptos fundamentales
2. **TESTING_SCENARIOS.md** - Escenarios 1-6 (base)
3. **TESTING_EXECUTION.md** - Cómo ejecutar

### 🟡 IMPORTANTE - Lee después

4. **TESTING_SCENARIOS.md** - Escenarios 7-10 (características)
5. **testing-helper.js** - Funciones disponibles
6. **TESTING_REPORT.md** - Cómo registrar resultados

### 🟢 NORMAL - Lee cuando sea necesario

7. **TESTING_SCENARIOS.md** - Escenarios 11-15 (UX)
8. **testing_automation.py** - Para automatización
9. **testing-dashboard.html** - Para visualización

---

## 🎯 MATRIZ DE ESCENARIOS

### ESCENARIOS BASE (Prioridad 🔴 CRÍTICA)

| # | Nombre | Referencia | Archivos Clave |
|---|--------|-----------|-----------------|
| 1 | Registro + Onboarding | TESTING_SCENARIOS.md:1 | register.js, onboarding-properties.js |
| 2 | Múltiples Viviendas | TESTING_SCENARIOS.md:2 | onboarding-properties.js |
| 3 | Validaciones | TESTING_SCENARIOS.md:3 | register.js, validaciones |
| 4 | Logout sin Vivienda | TESTING_SCENARIOS.md:4 | onboarding-properties.js |
| 5 | Login con Vivienda | TESTING_SCENARIOS.md:5 | login.js, dashboard-auth.js |
| 6 | Login sin Vivienda | TESTING_SCENARIOS.md:6 | dashboard-auth.js |

### ESCENARIOS CARACTERÍSTICAS (Prioridad 🟡 MEDIA)

| # | Nombre | Referencia | Archivos Clave |
|---|--------|-----------|-----------------|
| 7 | Cambiar Contraseña | TESTING_SCENARIOS.md:7 | dashboard.html (perfil) |
| 8 | Datos de Contacto | TESTING_SCENARIOS.md:8 | international-phone.js |
| 9 | Recuperar Contraseña | TESTING_SCENARIOS.md:9 | Supabase Auth |
| 10 | Acceso sin Auth | TESTING_SCENARIOS.md:10 | dashboard-auth.js |

### ESCENARIOS UX (Prioridad 🟢 NORMAL)

| # | Nombre | Referencia | Archivos Clave |
|---|--------|-----------|-----------------|
| 11 | Tema e Idioma | TESTING_SCENARIOS.md:11 | theme.js, translations.js |
| 12 | Agregar Vivienda Perfil | TESTING_SCENARIOS.md:12 | dashboard.html |
| 13 | Ver Vecinos | TESTING_SCENARIOS.md:13 | dashboard.html |
| 14 | Eliminar Cuenta | TESTING_SCENARIOS.md:14 | Supabase Auth |
| 15 | Comportamiento Móvil | TESTING_SCENARIOS.md:15 | CSS responsive |

---

## 🔧 HERRAMIENTAS DISPONIBLES

### testing-helper.js

Carga en consola:
```javascript
const script = document.createElement('script');
script.src = 'testing-helper.js';
document.head.appendChild(script);
```

Comandos principales:
```javascript
test.checkCurrentPage()                  // Ver página actual
test.checkIfAuthenticated()             // Estado de auth
test.checkUserData()                    // Datos usuario
test.checkPropietarioData()             // Datos propietario
test.checkPropiedadesAdicionales()      // Propiedades adicionales
test.fillRegisterForm(n, e, p)          // Llenar registro
test.fillPropertyForm(b, po, pl, l, t)  // Llenar vivienda
test.clickElement(sel, desc)            // Click elemento
test.log(msg, type)                     // Loguear
test.testRegisterFormElements()         // Verificar elementos registro
test.testOnboardingPageElements()       // Verificar elementos onboarding
test.testDashboardElements()            // Verificar elementos dashboard
```

### testing-dashboard.html

Abre en navegador:
```
testing-dashboard.html
```

Funcionalidad:
- 📊 Visualizar progreso en tiempo real
- 🔄 Actualizar estado de escenarios
- 📥 Exportar resultados a JSON
- 📈 Ver gráficos y estadísticas
- 🔄 Reiniciar datos

### testing_automation.py

Ejecuta:
```bash
python testing_automation.py
# o
pytest testing_automation.py -v
```

Genera:
- Logs en consola con timestamps
- JSON con resultados
- Reporte de ejecución

---

## 📊 FLUJO DE TRABAJO RECOMENDADO

### Día 1: Escenarios Base

```
Morning (1-2 horas):
├─ Lee: TESTING_README.md
├─ Lee: TESTING_SCENARIOS.md (Escenarios 1-6)
└─ Abre: testing-dashboard.html

Afternoon (2-3 horas):
├─ Carga: testing-helper.js
├─ Sigue: TESTING_EXECUTION.md
├─ Ejecuta: Escenarios 1-6
└─ Registra: TESTING_REPORT.md

Evening:
├─ Revisa: Resultados en dashboard
└─ Documenta: Bugs encontrados
```

### Día 2: Escenarios Características

```
Morning (1 hora):
├─ Revisa: TESTING_REPORT.md resultados previos
└─ Lee: TESTING_SCENARIOS.md (Escenarios 7-10)

Afternoon (2 horas):
├─ Ejecuta: Escenarios 7-10
├─ Registra: TESTING_REPORT.md
└─ Revisa: Bugs encontrados

Evening:
└─ Comunica: Issues encontrados
```

### Día 3: Escenarios UX + Revisión

```
Morning (1.5 horas):
├─ Lee: TESTING_SCENARIOS.md (Escenarios 11-15)
└─ Ejecuta: Escenarios 11-15

Afternoon (1.5 horas):
├─ Registra: TESTING_REPORT.md
├─ Revisa: testing-dashboard.html
└─ Genera: Reporte final

Evening:
└─ Sign-off: Validación completa
```

---

## 🐛 MANEJO DE BUGS ENCONTRADOS

### Flujo de Reporte

```
1. TEST FALLA
   └─ Documenta en TESTING_REPORT.md
      └─ Status: 🟡 PROBLEMAS
      └─ Descripción clara del bug

2. CREAR ISSUE
   └─ GitHub Issue (si aplica)
      └─ Título: [TESTING] Escenario N - Descripción
      └─ Descripción: Pasos para reproducir
      └─ Adjuntar: TESTING_REPORT.md

3. ESPERAR FIX
   └─ Desarrollador arregla el bug
   └─ Merge a main

4. RETEST
   └─ Vuelve a ejecutar el escenario
   └─ Actualiza: TESTING_REPORT.md
   └─ Status: 🟢 PASADO
```

---

## 📈 MÉTRICAS A TRACKEAR

### Por Escenario

- ✅ Tasa de éxito (% verificaciones que pasan)
- ⏱️ Tiempo de ejecución
- 🐛 Bugs encontrados
- 📝 Notas importantes

### Global

- 📊 Cobertura: X/15 escenarios completados
- 🎯 Tasa de éxito general: X%
- 🔴 Bugs críticos: N
- 🟡 Bugs menores: N
- ⏱️ Tiempo total invertido: X horas

---

## 🔗 REFERENCIAS RÁPIDAS

### URLs Locales

```
http://localhost:5500/register.html
http://localhost:5500/onboarding-properties.html
http://localhost:5500/login.html
http://localhost:5500/dashboard.html
http://localhost:5500/testing-dashboard.html
```

### Comandos Útiles en Console

```javascript
// Ver usuario
supabase.auth.getUser()

// Ver sesión
supabase.auth.getSession()

// Query datos
supabase.from('propietarios').select('*')

// Limpiar datos
localStorage.clear()

// Cerrar sesión
supabase.auth.signOut()
```

### DevTools Shortcuts

```
F12 o Ctrl+Shift+I ........... Abrir DevTools
Ctrl+Shift+J ................. Abrir Console
Ctrl+Shift+E ................. Abrir Network
Ctrl+Shift+K ................. Buscar en logs
Ctrl+Shift+C ................. Inspector
```

---

## ❓ FAQ - Preguntas Frecuentes

### ¿Por dónde empiezo?

→ Abre `testing-dashboard.html` primero para ver el estado general, luego lee `TESTING_README.md`

### ¿Cuánto tiempo toma?

→ ~6-8 horas total (testing manual)
→ ~30 minutos (automatización Selenium)

### ¿Qué hago si un test falla?

→ Marca como 🟡 PROBLEMAS en TESTING_REPORT.md
→ Documenta exactamente dónde falla
→ Crea un Issue si es un bug real

### ¿Puedo saltarme algunos escenarios?

→ No. Los Escenarios 1-6 son CRÍTICOS
→ Los 7-10 son IMPORTANTES
→ Los 11-15 son RECOMENDADOS

### ¿Cómo automatizo todo?

→ Usa `testing_automation.py`
→ O crea tus propios tests con Selenium
→ Configura CI/CD para ejecutar automáticamente

### ¿Dónde reporto bugs?

→ TESTING_REPORT.md (primer lugar)
→ GitHub Issues (si es un bug real del código)
→ Comunica al equipo de desarrollo

---

## 📞 SOPORTE

### Problemas con testing-helper.js

→ Verifica que Supabase está configurado
→ Recarga la página
→ Abre DevTools → Console → busca errores

### Problemas con testing_automation.py

→ Verifica instalación: `pip install -r requirements.txt`
→ Verifica Chrome está instalado
→ Verifica URL base en script

### Problemas generales

→ Consulta TESTING_EXECUTION.md sección "Solución de Problemas"
→ Revisa TESTING_README.md para contexto
→ Crea issue si no encuentras solución

---

## 📝 PLANTILLA DE REPORTE

Para reportar un issue de testing:

```
## Escenario: [N] - [Nombre]

### Descripción
[Descripción clara del problema]

### Pasos para reproducir
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

### Comportamiento esperado
[Qué debería suceder]

### Comportamiento actual
[Qué está sucediendo]

### Evidencia
- Screenshot: [adjuntar]
- Console error: [copiar]
- Network tab: [captura]

### Ambiente
- Navegador: Chrome/Firefox/Safari
- Sistema: Windows/Mac/Linux
- Versión: [si aplica]

### Severidad
- 🔴 CRÍTICA (bloquea flujo principal)
- 🟡 IMPORTANTE (afecta funcionalidad)
- 🟢 NORMAL (problema menor)
```

---

## ✅ CHECKLIST FINAL

Antes de dar por finalizado el testing:

- [ ] Todos los 15 escenarios ejecutados
- [ ] TESTING_REPORT.md completamente rellenado
- [ ] 0 bugs críticos sin resolver
- [ ] Tasa de éxito > 95%
- [ ] Datos verificados en Supabase
- [ ] Testeado en 2+ navegadores
- [ ] Testeado en dispositivo móvil
- [ ] Documentación actualizada
- [ ] Testing suite en GitHub
- [ ] Producción lista para deploy

---

**Versión:** 1.0  
**Última actualización:** 2024  
**Estado:** ✅ Listo para usar

---

## 🎓 SIGUIENTES PASOS

1. Abre `testing-dashboard.html` en tu navegador
2. Lee `TESTING_README.md`
3. Comienza con Escenario 1 de `TESTING_EXECUTION.md`
4. ¡Feliz testing! 🚀
