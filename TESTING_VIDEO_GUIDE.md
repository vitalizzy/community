# 🎬 GUÍA DE VIDEO - Testing L2H Community

Esta guía describe cómo crear videos cortos de testing para documentar los flujos.

---

## 📹 VIDEOS SUGERIDOS

### Video 1: Introducción a Testing (5 min)

**Contenido:**
- Qué es testing
- Por qué es importante
- Estructura de los 15 escenarios
- Herramientas disponibles

**Script:**
```
"Bienvenido al testing suite de L2H Community.
En este video, veremos la estructura completa de testing,
cómo acceder a las herramientas, y qué esperar durante el proceso.

Tenemos 15 escenarios organizados en 3 categorías:
- Escenarios Base (1-6): Flujo principal
- Escenarios Características (7-10): Funcionalidades adicionales
- Escenarios UX (11-15): Accesibilidad y diseño

Las herramientas incluyen:
- Dashboard visual (testing-dashboard.html)
- Helper para consola (testing-helper.js)
- Automatización Selenium (testing_automation.py)

Vamos a empezar..."
```

**Grabación de pantalla:**
- Mostrar testing-dashboard.html
- Mostrar TESTING_INDEX.md
- Mostrar TESTING_README.md

---

### Video 2: Configuración Inicial (3 min)

**Contenido:**
- Cómo instalar dependencias
- Cómo cargar testing-helper.js
- Verificaciones iniciales

**Script:**
```
"Primero, asegúrate de tener:
1. La aplicación corriendo en http://localhost:5500
2. Supabase configurado correctamente
3. Browser DevTools abierto (F12)

Para cargar el helper, ve a Console y copia:
const script = document.createElement('script');
script.src = 'testing-helper.js';
document.head.appendChild(script);

Deberías ver: 'Testing Helper Cargado'

Luego, escribe: test.printTestingSummary()
para ver todos los comandos disponibles."
```

**Grabación de pantalla:**
- Abrir DevTools
- Pegar código
- Ver confirmación
- Mostrar comando help

---

### Video 3: Escenario 1 - Registro (7 min)

**Contenido:**
- Paso a paso del registro
- Qué verificar
- Errores comunes

**Script:**
```
"Escenario 1: Registro Nuevo Usuario + Agregar Vivienda

Este es el flujo más crítico. Aquí:
1. Navegamos a register.html
2. Rellenamos: nombre, email, contraseña
3. Marcamos GDPR
4. Hacemos click en Registrarse
5. Verificamos redirección a onboarding
6. Agregamos la vivienda
7. Continuamos al dashboard

Veamos cada paso..."

[Mostrar cada paso en pantalla]

"Si algo falla:
- Verifica que no hay errores en Console
- Verifica que Supabase está conectado
- Intenta con otro email (debe ser único)

Cuando termines, marca en el dashboard."
```

**Grabación de pantalla:**
- Navegar a register.html
- Rellenar formulario
- Enviar
- Navegar onboarding
- Agregar vivienda
- Ir a dashboard
- Verificar datos en Supabase

---

### Video 4: Escenario 5 - Login (5 min)

**Contenido:**
- Cómo hacer login
- Qué verificar en dashboard

**Script:**
```
"Escenario 5: Login con Vivienda

Si ya registraste un usuario en el Escenario 1,
ahora veremos cómo hacer login.

1. Navega a login.html
2. Ingresa tu email
3. Ingresa tu contraseña
4. Haz click en Login
5. Deberías ir directamente al dashboard

En el dashboard, verifica:
- Tu nombre aparece en el perfil
- Tu vivienda aparece listada
- Puedes ver el menú de perfil

Esto valida que el flujo de autenticación funciona."
```

**Grabación de pantalla:**
- Navegar a login.html
- Ingresar credenciales
- Hacer login
- Verificar dashboard
- Abrir perfil

---

### Video 5: Escenario 3 - Validaciones (4 min)

**Contenido:**
- Qué es validación
- Casos que fallan
- Mensajes de error

**Script:**
```
"Escenario 3: Validaciones

Las validaciones protegen la integridad de los datos.
Aquí probamos qué pasa cuando:

1. Email inválido
2. Contraseñas diferentes
3. GDPR no aceptado
4. Campos vacíos

Para cada caso, el formulario debería:
- Mostrar un mensaje de error claro
- NO enviar los datos
- Mantener el formulario abierto

Veamos cada validación en acción..."
```

**Grabación de pantalla:**
- Intentar con email inválido
- Intentar con contraseñas diferentes
- Intentar sin GDPR
- Intentar con campos vacíos
- Mostrar mensajes de error para cada uno

---

### Video 6: Testing Automatizado (5 min)

**Contenido:**
- Instalar dependencias
- Ejecutar script Selenium
- Interpretar resultados

**Script:**
```
"Testing Automatizado

Si prefieres automatizar:
1. Instala: pip install selenium webdriver-manager pytest
2. En Terminal: python testing_automation.py
3. Verifica resultados en test_results_*.json

El script automáticamente:
- Abre el navegador
- Rellena formularios
- Verifica flujos
- Genera reportes

Esto es perfecto para CI/CD y testing repetitivo."
```

**Grabación de pantalla:**
- Abrir Terminal/PowerShell
- Instalar dependencias
- Ejecutar script
- Mostrar ejecución en tiempo real
- Mostrar archivo JSON generado

---

### Video 7: Dashboard de Progreso (3 min)

**Contenido:**
- Cómo usar testing-dashboard.html
- Visualizar progreso
- Exportar resultados

**Script:**
```
"Dashboard Visual

Abre testing-dashboard.html en tu navegador.

Aquí puedes:
1. Ver el progreso general en tiempo real
2. Hacer click en los botones para actualizar estado
3. Ver gráficos de distribución
4. Exportar resultados a JSON

Cada vez que completas un escenario:
- Haz click en el emoji correcto (✅, ❌ o ⏳)
- El dashboard se actualiza automáticamente
- Se guarda en localStorage

Es una forma visual de trackear el progreso del equipo."
```

**Grabación de pantalla:**
- Abrir dashboard
- Mostrar estadísticas
- Hacer click en botones
- Mostrar actualización en tiempo real
- Mostrar gráfico
- Exportar datos

---

### Video 8: Debugging Común (6 min)

**Contenido:**
- Errores comunes
- Cómo debuguear
- Soluciones

**Script:**
```
"Debugging Común

¿Qué hacer si algo falla?

Problema 1: 'Element not found'
→ Verifica que estamos en la página correcta
→ test.checkCurrentPage()
→ Recarga la página (F5)

Problema 2: 'Supabase connection failed'
→ Verifica que supabase-config.js está cargado
→ test.checkSupabaseConnection()
→ Verifica tu API key en supabase-config.js

Problema 3: 'Datos no se guardan'
→ Verifica permisos RLS en Supabase
→ test.checkUserData()
→ Ve a Supabase dashboard → RLS policies

Problema 4: 'Usuario no autenticado'
→ Verifica que completaste el registro
→ test.checkIfAuthenticated()
→ Intenta logout + login nuevamente

Siempre usa el testing-helper para diagnosticar."
```

**Grabación de pantalla:**
- Mostrar cada error
- Usar test.log()
- Mostrar solución
- Verificar que funciona

---

### Video 9: Flujo Completo (10 min)

**Contenido:**
- Ejecutar 3-4 escenarios seguidos
- Ver el ciclo completo
- Validar resultados

**Script:**
```
"Flujo Completo de Testing

Veamos cómo ejecutar un flujo completo:

1. Registro (Escenario 1)
2. Agregar vivienda (Parte del Escenario 1)
3. Logout (Escenario 4)
4. Login (Escenario 5)
5. Ver datos en dashboard

Esto toma aproximadamente 10 minutos manualmente.

Con cada paso, verificamos:
- Redirecciones correctas
- Datos guardados
- UI responde correctamente
- Mensajes son claros

Al final, actualiza el dashboard de progreso."
```

**Grabación de pantalla:**
- Ejecutar cada escenario
- Mostrar transiciones
- Verificar datos
- Actualizar dashboard
- Mostrar resultados

---

### Video 10: Best Practices (5 min)

**Contenido:**
- Cómo testear efectivamente
- Qué documentar
- Errores a evitar

**Script:**
```
"Best Practices de Testing

1. Organiza tu tiempo
   - Día 1: Escenarios 1-6 (Base)
   - Día 2: Escenarios 7-10 (Características)
   - Día 3: Escenarios 11-15 (UX)

2. Documenta claramente
   - Qué esperabas vs qué pasó
   - Pasos exactos para reproducir
   - Adjunta screenshots si es necesario

3. Retest después de fixes
   - No asumas que está arreglado
   - Verifica el escenario completo
   - Actualiza el reporte

4. Usa el helper
   - Aprovecha test.log()
   - Verifica conexión regularmente
   - Inspecciona datos en Supabase

5. Comunica encontrados
   - Crea issues clara con contexto
   - Adjunta TESTING_REPORT.md
   - Sé específico sobre el bug"
```

---

## 🎯 PLAN DE GRABACIÓN

### Semana 1: Videos Introductorios
- [ ] Video 1: Introducción (5 min)
- [ ] Video 2: Configuración (3 min)
- [ ] Video 3: Escenario 1 (7 min)

### Semana 2: Videos Funcionales
- [ ] Video 5: Escenario 5 (5 min)
- [ ] Video 3: Escenario 3 (4 min)
- [ ] Video 6: Automatización (5 min)

### Semana 3: Videos Avanzados
- [ ] Video 7: Dashboard (3 min)
- [ ] Video 8: Debugging (6 min)
- [ ] Video 9: Flujo Completo (10 min)
- [ ] Video 10: Best Practices (5 min)

**Total:** ~53 minutos de video (producción de 2-3 semanas)

---

## 📱 FORMATOS DE DISTRIBUCIÓN

### YouTube Playlist
```
L2H Community - Testing Suite Complete
├─ [1] Introducción
├─ [2] Configuración
├─ [3] Escenario 1
├─ [4] Escenario 5
├─ [5] Validaciones
├─ [6] Automatización
├─ [7] Dashboard
├─ [8] Debugging
├─ [9] Flujo Completo
└─ [10] Best Practices
```

### Documentación Integrada

```
TESTING_README.md
├─ Link a Video 1
├─ Link a Video 2
└─ Link a Video 3

TESTING_EXECUTION.md
├─ Link a Video 3 (Escenario 1)
├─ Link a Video 5 (Escenario 5)
└─ Link a Video 8 (Debugging)
```

---

## 🎬 HERRAMIENTAS RECOMENDADAS

Para grabar y editar:

### Grabación
- **OBS Studio** (gratuito, multiplataforma)
- **ScreenFlow** (Mac)
- **Camtasia** (profesional)

### Edición
- **DaVinci Resolve** (gratuito, potente)
- **Adobe Premiere** (profesional)
- **iMovie** (Mac simple)

### Hosting
- **YouTube** (recomendado)
- **Vimeo** (alternativa)
- **GitHub** (como parte de documentación)

---

## 🔧 CONFIGURACIÓN DE GRABACIÓN

### Resolución
- 1920x1080 (Full HD) mínimo
- 2560x1440 (2K) ideal

### Frame Rate
- 30 fps (suficiente)
- 60 fps (más suave)

### Audio
- Micrófono de buena calidad
- Descubre ruido de fondo
- Niveles entre -12 y -6 dB

### Font Size
- Zoom en VS Code: 120-150%
- Browser: 125% zoom
- Para que se vea bien en cualquier pantalla

---

## 📋 SCRIPT TEMPLATE

Usa este template para cada video:

```
---
TÍTULO: [Nombre del Video]
DURACIÓN: X minutos
OBJETIVO: [Qué aprenderá el usuario]

---
INTRODUCCIÓN (15-20 seg)

Hola, en este video vamos a...

---
CONTENIDO PRINCIPAL

[Detalles del contenido]
[Mostrar pantalla]
[Explicar paso a paso]

---
DEMOSTRACIÓN EN VIVO

[Ejecutar los pasos en tiempo real]

---
CONCLUSIÓN (10-15 seg)

Para resumir...
[Llamada a acción]

---
REFERENCIAS
- [Link a documentación]
- [Link a código]
- [Link a otro video]
```

---

## 🎯 QUALITY CHECKLIST

Antes de publicar cada video:

- [ ] Audio claro sin ruido de fondo
- [ ] Video a 1920x1080 mínimo
- [ ] Subtítulos en español
- [ ] Captions para palabras técnicas
- [ ] Timestamps en descripción
- [ ] Links a documentación
- [ ] Referencias en README
- [ ] Duración óptima (no >15 min)
- [ ] Call-to-action al final
- [ ] Palabras clave en título/descripción

---

**Próximo paso:** Empieza grabando Video 1 con OBS Studio

