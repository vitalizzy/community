# 📋 TESTING CHECKLIST - IMPRIMIBLE

Copia y pega este contenido en Word/Google Docs para imprimir.

---

## L2H COMMUNITY - TESTING CHECKLIST

**Proyecto:** Migración Web a Supabase
**Fecha de Inicio:** _______________
**Tester:** _____________________________
**Navegador/Device:** __________________________

---

## 📋 CHECKLIST DE PREPARACIÓN

- [ ] Aplicación está corriendo en http://localhost:5500
- [ ] Supabase está conectado (verificar en DevTools)
- [ ] Git está actualizado
- [ ] testing-helper.js está cargado en consola
- [ ] TESTING_REPORT.md está abierto
- [ ] testing-dashboard.html está abierto en otra pestaña

---

## 🔴 ESCENARIOS BASE - PRIORIDAD CRÍTICA

### Escenario 1: Registro Nuevo Usuario + Agregar Vivienda

**Objetivo:** Validar flujo completo de registro y onboarding

**Duración estimada:** 20 minutos

- [ ] Navegar a register.html
- [ ] Rellenar: Nombre, Email, Password, Confirmar, GDPR
- [ ] Click Registrarse
- [ ] ✅ Redirigido a onboarding-properties.html
- [ ] ✅ Rellenar y agregar vivienda
- [ ] ✅ Click Continuar
- [ ] ✅ Dashboard carga correctamente
- [ ] ✅ Datos guardados en Supabase

**Email usado:** ___________________
**Vivienda agregada:** Bloque___, Portal___, Planta___, Letra___, Tipo___

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO

**Observaciones:**
_________________________________________________________________
_________________________________________________________________

---

### Escenario 2: Múltiples Viviendas

**Objetivo:** Validar agregar múltiples propiedades

**Duración estimada:** 15 minutos

- [ ] Navegar a onboarding-properties.html
- [ ] Agregar vivienda #1: Bloque 3, Portal 2, Planta 2, Letra B
- [ ] Agregar vivienda #2: Bloque 1, Portal 1, Planta 3, Letra C
- [ ] ✅ Ambas aparecen en la lista
- [ ] ✅ No hay duplicados
- [ ] ✅ Datos en Supabase correctos

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO

**Observaciones:**
_________________________________________________________________

---

### Escenario 3: Validaciones

**Objetivo:** Validar que formularios rechacen datos inválidos

**Duración estimada:** 15 minutos

- [ ] Email inválido → Error mostrado
- [ ] Contraseñas diferentes → Error mostrado
- [ ] GDPR no marcado → Error mostrado
- [ ] Campos vacíos → Error mostrado
- [ ] Email duplicado → Error mostrado

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO

**Observaciones:**
_________________________________________________________________

---

### Escenario 4: Logout sin Vivienda

**Objetivo:** Validar logout desde onboarding

**Duración estimada:** 5 minutos

- [ ] Desde onboarding, click Logout
- [ ] ✅ Redirigido a login.html
- [ ] ✅ Sesión cerrada

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO

---

### Escenario 5: Login con Vivienda

**Objetivo:** Validar login y acceso a dashboard

**Duración estimada:** 10 minutos

- [ ] Navegar a login.html
- [ ] Ingresar email y contraseña
- [ ] Click Login
- [ ] ✅ Redirigido a dashboard.html
- [ ] ✅ Nombre visible en perfil
- [ ] ✅ Vivienda visible

**Email:** _________________
**Password:** _________________

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO

---

### Escenario 6: Login sin Vivienda (Redirect)

**Objetivo:** Validar que usuario sin vivienda es redirigido a onboarding

**Duración estimada:** 10 minutos

**Nota:** Requiere usuario en BD sin propietario (ver instrucciones en TESTING_EXECUTION.md)

- [ ] Login con usuario sin vivienda
- [ ] ✅ Redirigido a onboarding-properties.html
- [ ] ✅ NO accede a dashboard
- [ ] ✅ Puede completar onboarding

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

## RESUMEN ESCENARIOS BASE

**Total Escenarios Base:** 6
**Completados:** _____ / 6
**Pasados:** _____
**Problemas:** _____

**Tasa de éxito (Base):** _____ %

---

## 🟡 ESCENARIOS CARACTERÍSTICAS - PRIORIDAD MEDIA

### Escenario 7: Cambiar Contraseña

**Duración estimada:** 10 minutos

- [ ] En perfil, acceder a "Cambiar Contraseña"
- [ ] Ingresar contraseña actual
- [ ] Ingresar contraseña nueva (2 veces)
- [ ] Click Guardar
- [ ] ✅ Mensaje de éxito
- [ ] ✅ Login funciona con nueva contraseña

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

### Escenario 8: Datos de Contacto (Teléfono Internacional)

**Duración estimada:** 15 minutos

- [ ] En perfil, sección de contacto
- [ ] Seleccionar país (ej: Colombia +57)
- [ ] Ingresar número de teléfono
- [ ] Marcar GDPR
- [ ] Click Guardar
- [ ] ✅ Teléfono guardado en Supabase

**País:** __________
**Teléfono:** __________

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

### Escenario 9: Recuperar Contraseña

**Duración estimada:** 10 minutos

**Nota:** Requiere Supabase configurado para emails

- [ ] Navegar a forgot-password.html
- [ ] Ingresar email
- [ ] Click "Enviar enlace"
- [ ] ✅ Mensaje de éxito
- [ ] Revisar email (o Supabase logs)
- [ ] ✅ Enlace funciona
- [ ] ✅ Reset de contraseña funciona

**Email usado:** _________________

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

### Escenario 10: Acceso sin Autenticación (Security)

**Duración estimada:** 5 minutos

- [ ] Cerrar sesión completamente
- [ ] Intentar acceder a dashboard.html directamente
- [ ] ✅ Redirigido a login.html
- [ ] Intentar acceder a onboarding-properties.html
- [ ] ✅ Redirigido a login.html

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

## RESUMEN CARACTERÍSTICAS

**Total Características:** 4
**Completados:** _____ / 4
**Pasados:** _____
**Problemas:** _____

**Tasa de éxito (Características):** _____ %

---

## 🟢 ESCENARIOS UX - PRIORIDAD NORMAL

### Escenario 11: Tema e Idioma

**Duración estimada:** 10 minutos

- [ ] En perfil, cambiar idioma a EN
- [ ] ✅ Todo cambia a inglés
- [ ] Cambiar a FR (Francés)
- [ ] ✅ Todo cambia a francés
- [ ] Cambiar tema a Dark
- [ ] ✅ Tema oscuro aplicado
- [ ] Recargar página
- [ ] ✅ Preferencias persisten

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

### Escenario 12: Agregar Vivienda en Perfil

**Duración estimada:** 15 minutos

- [ ] En dashboard, abrir perfil
- [ ] Buscar opción "Agregar Vivienda"
- [ ] Click y agregar nueva vivienda
- [ ] ✅ Vivienda aparece en lista
- [ ] ✅ Datos se guardan en Supabase

**Vivienda agregada:** Bloque___, Portal___, Planta___, Letra___

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

### Escenario 13: Ver Vecinos

**Duración estimada:** 10 minutos

- [ ] En dashboard, buscar sección "Vecinos"
- [ ] ✅ Lista de vecinos por vivienda
- [ ] Verificar que muestra nombres
- [ ] ✅ Información correcta
- [ ] Verificar que solo muestra tu vivienda

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

### Escenario 14: Eliminar Cuenta

**Duración estimada:** 10 minutos

**NOTA:** Esto borrará la cuenta - usar email de test

- [ ] En perfil, scroll al final
- [ ] Buscar "Eliminar Cuenta"
- [ ] Click y confirmar
- [ ] ✅ Mensaje de confirmación
- [ ] ✅ Cuenta eliminada
- [ ] Intentar login con email
- [ ] ✅ Error - Cuenta no existe

**Email eliminado:** _________________

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

### Escenario 15: Comportamiento Móvil

**Duración estimada:** 20 minutos

**NOTA:** Usar DevTools o dispositivo real (375px mín)

- [ ] Abrir DevTools (F12)
- [ ] Activar modo móvil (375px)
- [ ] Navegar por todas las páginas
- [ ] ✅ Registro se ve bien
- [ ] ✅ Onboarding se ve bien
- [ ] ✅ Dashboard se ve bien
- [ ] ✅ Perfil se ve bien
- [ ] ✅ No hay scroll horizontal
- [ ] ✅ Botones son clickeables

**Device:** ________________
**Navegador:** ______________

**Status:**
- [ ] ✅ PASADO
- [ ] 🟡 PROBLEMAS
- [ ] ❌ FALLIDO
- [ ] ⏳ NO EJECUTADO

---

## RESUMEN UX

**Total UX:** 5
**Completados:** _____ / 5
**Pasados:** _____
**Problemas:** _____

**Tasa de éxito (UX):** _____ %

---

## 📊 RESUMEN FINAL

**Fecha Fin:** _______________
**Tiempo Total Invertido:** _____ horas

### Escenarios Completados
| Tipo | Total | Pasados | Problemas | Tasa |
|------|-------|---------|-----------|------|
| Base | 6 | ____ | ____ | ___% |
| Características | 4 | ____ | ____ | ___% |
| UX | 5 | ____ | ____ | ___% |
| **TOTAL** | **15** | **____** | **____** | **____%** |

### Status General
- [ ] ✅ TODO PASADO (95%+)
- [ ] 🟡 MAYORMENTE PASADO (80-95%)
- [ ] ⚠️ PROBLEMAS IMPORTANTES (<80%)

---

## 🐛 BUGS ENCONTRADOS

**Número de Bugs:** _____

### Bug #1
- **Escenario:** _____
- **Descripción:** _____________________________________________
- **Pasos para reproducir:** ____________________________________
- **Severidad:** [ ] 🔴 Crítica [ ] 🟡 Media [ ] 🟢 Baja
- **Reportado en:** _________________

### Bug #2
- **Escenario:** _____
- **Descripción:** _____________________________________________
- **Pasos para reproducir:** ____________________________________
- **Severidad:** [ ] 🔴 Crítica [ ] 🟡 Media [ ] 🟢 Baja
- **Reportado en:** _________________

(Agregar más según sea necesario)

---

## 📝 OBSERVACIONES GENERALES

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## ✅ CHECKLIST FINAL

- [ ] Todos los 15 escenarios ejecutados
- [ ] TESTING_REPORT.md completamente rellenado
- [ ] Bugs documentados
- [ ] 0 bugs críticos sin resolver (o documentados)
- [ ] Tasa de éxito > 95%
- [ ] Testeado en al menos 2 navegadores
- [ ] Testeado en dispositivo móvil
- [ ] Dashboard actualizado
- [ ] Resultados compartidos con equipo

---

## 🎯 SIGN-OFF

**Tester:** ___________________________

**Firma:** ___________________________

**Fecha:** ___________________________

**Resultado Final:**
- [ ] ✅ APROBADO PARA PRODUCCIÓN
- [ ] 🟡 APROBADO CON REPAROS
- [ ] ❌ NO APROBADO - REQUIERE FIXES

**Notas:** _____________________________________________

---

**Este checklist puede imprimirse y usarse durante el testing.**

**Para actualizar el estado, también usa:**
- testing-dashboard.html (visual)
- TESTING_REPORT.md (digital)

---

Versión: 1.0 | Fecha: 2024
