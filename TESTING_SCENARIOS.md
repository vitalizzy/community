# USER FLOW - ESCENARIOS DE PRUEBA L2H COMMUNITY

## ESCENARIO 1: Registro Nuevo Usuario + Agregar Vivienda
**Objetivo**: Verificar que un usuario nuevo puede registrarse y agregar vivienda correctamente

**Pasos**:
1. Ir a register.html
2. Completar formulario:
   - Nombre: "Juan García"
   - Email: "juan@example.com"
   - Contraseña: "SecurePass123"
   - Confirmar Contraseña: "SecurePass123"
   - Aceptar GDPR: ✓
3. Click "Registrarse"
4. Verificar redirect a onboarding-properties.html
5. Llenar datos de vivienda:
   - Bloque: 2
   - Portal: 1
   - Planta: 1
   - Letra: A
   - Tipo: Dueño
6. Click "Agregar Vivienda"
7. Verificar que la vivienda aparece en la lista
8. Click "Continuar al Dashboard"
9. Verificar que llega a dashboard.html con datos cargados

**Resultados esperados**:
- ✅ Registro exitoso
- ✅ Redirige a onboarding
- ✅ Vivienda guardada en Supabase (propietarios)
- ✅ Acceso a dashboard concedido
- ✅ Datos de propietario mostrados correctamente

---

## ESCENARIO 2: Agregar Múltiples Viviendas en Onboarding
**Objetivo**: Verificar que un usuario puede agregar múltiples viviendas

**Pasos**:
1. Completar registro nuevo (Escenario 1 hasta paso 6)
2. Click "Agregar Vivienda"
3. Verificar que vivienda 1 aparece
4. Llenar segunda vivienda:
   - Bloque: 3
   - Portal: 2
   - Planta: 2
   - Letra: B
   - Tipo: PropertyManager
5. Click "Agregar Vivienda"
6. Verificar que aparecen 2 viviendas en la lista
7. Llenar tercera vivienda:
   - Bloque: 4
   - Portal: 1
   - Planta: Bajo
   - Letra: C
   - Tipo: Inquilino
8. Click "Agregar Vivienda"
9. Verificar que aparecen 3 viviendas
10. Click "Continuar al Dashboard"

**Resultados esperados**:
- ✅ Primera vivienda se guarda en propietarios
- ✅ Viviendas adicionales se guardan en propiedades_adicionales
- ✅ Lista muestra todas las viviendas
- ✅ Botón continuar funciona
- ✅ Dashboard carga correctamente

---

## ESCENARIO 3: Validaciones en Onboarding
**Objetivo**: Verificar que las validaciones funcionan correctamente

**Pasos**:
1. Completar registro y llegar a onboarding
2. Click "Agregar Vivienda" sin completar campos
   - Verificar que NO se guarda
   - Verificar mensaje de error
3. Agregar vivienda: Bloque 2, Portal 1, Planta 1, Letra A, Tipo Dueño
4. Intentar agregar la MISMA vivienda nuevamente
   - Verificar que NO se guarda
   - Verificar mensaje de error "duplicada"
5. Agregar vivienda diferente correctamente

**Resultados esperados**:
- ✅ Campos obligatorios validados
- ✅ No se guarda sin llenar campos
- ✅ Duplicados detectados
- ✅ Mensajes de error claros

---

## ESCENARIO 4: Logout en Onboarding SIN Agregar Vivienda
**Objetivo**: Verificar que usuario puede salir sin agregar vivienda

**Pasos**:
1. Completar registro y llegar a onboarding
2. Click botón "Salir"
3. Verificar redirect a login.html
4. Intentar hacer login con credenciales nuevas
5. Verificar que NO puede acceder a dashboard

**Resultados esperados**:
- ✅ Logout funciona
- ✅ Redirige a login
- ✅ Usuario sin propietario no puede acceder a dashboard
- ✅ Redirige nuevamente a onboarding

---

## ESCENARIO 5: Login Usuario con Vivienda Existente
**Objetivo**: Verificar que usuario existente accede directamente a dashboard

**Pasos**:
1. Registrar usuario nuevo (Escenario 1 completo)
2. Logout desde dashboard
3. Login con mismo email y contraseña
4. Verificar que accede directamente a dashboard
5. Verificar que datos de propietario se cargan

**Resultados esperados**:
- ✅ Login exitoso
- ✅ Acceso directo a dashboard
- ✅ NO pasa por onboarding
- ✅ Datos de propietario visibles

---

## ESCENARIO 6: Login Usuario SIN Vivienda
**Objetivo**: Verificar que usuario sin vivienda va a onboarding en login

**Pasos**:
1. Registrar usuario nuevo
2. NO agregar vivienda, click logout en onboarding
3. Hacer login nuevamente
4. Verificar redirect a onboarding-properties.html
5. Agregar vivienda
6. Continuar a dashboard

**Resultados esperados**:
- ✅ Login detecta falta de propietario
- ✅ Redirige a onboarding
- ✅ Usuario puede agregar vivienda y continuar

---

## ESCENARIO 7: Cambiar Contraseña desde Dashboard
**Objetivo**: Verificar que puede cambiar contraseña

**Pasos**:
1. Login exitoso con usuario que tiene vivienda
2. Click menu perfil (avatar)
3. Verificar que hay botón "Cambiar contraseña"
4. Click "Cambiar contraseña"
5. Verificar que redirige a change-password.html
6. Completar cambio de contraseña
7. Logout
8. Login con NUEVA contraseña
9. Verificar acceso a dashboard

**Resultados esperados**:
- ✅ Botón de cambiar contraseña visible
- ✅ Redirige a página de cambio
- ✅ Contraseña cambia en Supabase
- ✅ Login funciona con nueva contraseña

---

## ESCENARIO 8: Agregar Datos de Contacto en Perfil
**Objetivo**: Verificar que puede agregar teléfono internacional

**Pasos**:
1. Login exitoso
2. Click menu perfil
3. Sección "Información de contacto"
4. Seleccionar país: España (+34)
5. Ingresar teléfono: 612345678
6. Aceptar GDPR
7. Click "Guardar cambios"
8. Verificar que teléfono se guarda como "+34612345678"
9. Logout y login nuevamente
10. Verificar que teléfono se prefill correctamente

**Resultados esperados**:
- ✅ Dropdown de países carga correctamente
- ✅ Teléfono solo acepta dígitos
- ✅ Se concatena con código de país
- ✅ Se guarda en Supabase correctamente
- ✅ Se prefill en siguientes logins

---

## ESCENARIO 9: Recuperar Contraseña
**Objetivo**: Verificar flujo de recuperación de contraseña

**Pasos**:
1. Ir a login.html
2. Click "¿Olvidaste tu contraseña?"
3. Verificar redirect a forgot-password.html
4. Ingresar email de usuario registrado
5. Click "Enviar enlace"
6. Verificar mensaje de confirmación
7. Revisar email (en desarrollo, verificar logs)
8. Click link de recuperación
9. Ingresar nueva contraseña
10. Logout y login con nueva contraseña

**Resultados esperados**:
- ✅ Forgot password funciona
- ✅ Email enviado (simular en dev)
- ✅ Link de recuperación válido
- ✅ Nueva contraseña funciona

---

## ESCENARIO 10: Acceder sin Autenticación
**Objetivo**: Verificar protección de pages

**Pasos**:
1. Abrir dashboard.html directamente sin login
2. Verificar redirect a login.html
3. Abrir onboarding-properties.html sin login
4. Verificar redirect a login.html
5. Abrir change-password.html sin link válido
6. Verificar error o redirect

**Resultados esperados**:
- ✅ Dashboard protegido
- ✅ Onboarding protegido
- ✅ Redirige a login automáticamente
- ✅ No puede acceder sin sesión válida

---

## ESCENARIO 11: Cambios de Tema y Idioma
**Objetivo**: Verificar que tema e idioma funcionan en onboarding

**Pasos**:
1. Llegar a onboarding-properties.html
2. Click botón de tema (si está disponible)
3. Verificar cambio a dark mode
4. Verificar que interfaz sigue siendo usable
5. Cambiar idioma a inglés, francés, alemán
6. Verificar que todas las etiquetas cambian correctamente

**Resultados esperados**:
- ✅ Tema se aplica correctamente
- ✅ Interfaz visible en ambos temas
- ✅ Idiomas cambian correctamente
- ✅ Traducción es completa

---

## ESCENARIO 12: Agregar Vivienda Adicional en Perfil
**Objetivo**: Verificar que puede agregar vivienda adicional desde dashboard

**Pasos**:
1. Login exitoso
2. Click menu perfil
3. Sección "Mis viviendas"
4. Click botón "Agregar vivienda"
5. Llenar datos:
   - Bloque: 5
   - Portal: 1
   - Planta: Ático
   - Letra: A
   - Alias (opcional): "Casa de la playa"
6. Click "Guardar vivienda"
7. Verificar que se agrega a la lista
8. Verificar que aparece en propiedades_adicionales

**Resultados esperados**:
- ✅ Formulario accesible
- ✅ Vivienda se guarda correctamente
- ✅ Aparece en la lista inmediatamente
- ✅ Se guarda en Supabase

---

## ESCENARIO 13: Ver Vecinos Registrados
**Objetivo**: Verificar que puede ver vecinos

**Pasos**:
1. Registrar 2 usuarios (Juan y María)
2. Juan agrega: Bloque 2, Portal 1, Planta 1, Letra A
3. María agrega: Bloque 2, Portal 1, Planta 1, Letra B
4. Juan hace login
5. Abre perfil
6. Sección "Vecinos registrados"
7. Debe ver a María en su vivienda

**Resultados esperados**:
- ✅ Vecinos aparecen correctamente
- ✅ Agrupados por vivienda
- ✅ Muestra nombre y email
- ✅ No se muestra a sí mismo

---

## ESCENARIO 14: Eliminación de Cuenta
**Objetivo**: Verificar flujo de eliminación de cuenta

**Pasos**:
1. Login exitoso
2. Click menu perfil
3. Scroll a "Eliminar cuenta"
4. Click "Solicitar eliminación"
5. Confirmar en modal
6. Verificar mensaje de confirmación
7. Revisar email (simular en dev)
8. Logout
9. Intentar login con mismas credenciales
10. Verificar que NO funciona

**Resultados esperados**:
- ✅ Solicitud de eliminación funciona
- ✅ Email de confirmación enviado (simular)
- ✅ Cuenta se marca para eliminación
- ✅ Ya no puede hacer login

---

## ESCENARIO 15: Comportamiento en Móvil
**Objetivo**: Verificar responsiveness en dispositivo móvil

**Pasos**:
1. Abrir en modo responsivo (375px - iPhone)
2. Completar flujo de registro
3. En onboarding, verificar:
   - Formulario visible correctamente
   - Botones accesibles
   - Lista de viviendas scrolleable
4. En dashboard:
   - Menú perfil funciona
   - Formularios completos
   - Todo legible

**Resultados esperados**:
- ✅ Diseño responsive funciona
- ✅ Elementos accesibles en móvil
- ✅ Sin overflow horizontal
- ✅ Touch friendly

---

## TABLA DE VERIFICACIÓN RÁPIDA

| Escenario | Estado | Notas |
|-----------|--------|-------|
| 1. Registro + Agregar Vivienda | ⚫ Pendiente | |
| 2. Múltiples Viviendas | ⚫ Pendiente | |
| 3. Validaciones | ⚫ Pendiente | |
| 4. Logout sin Vivienda | ⚫ Pendiente | |
| 5. Login con Vivienda | ⚫ Pendiente | |
| 6. Login sin Vivienda | ⚫ Pendiente | |
| 7. Cambiar Contraseña | ⚫ Pendiente | |
| 8. Datos de Contacto | ⚫ Pendiente | |
| 9. Recuperar Contraseña | ⚫ Pendiente | |
| 10. Acceso sin Auth | ⚫ Pendiente | |
| 11. Tema e Idioma | ⚫ Pendiente | |
| 12. Agregar Vivienda Perfil | ⚫ Pendiente | |
| 13. Ver Vecinos | ⚫ Pendiente | |
| 14. Eliminar Cuenta | ⚫ Pendiente | |
| 15. Móvil | ⚫ Pendiente | |

---

## NOTAS DE TESTING

### Ambiente de Desarrollo
- URL base: `http://localhost:5000` (ajustar según config)
- Supabase: Project de desarrollo
- Email: Verificar en logs de Supabase
- Contraseñas: Mínimo 8 caracteres, mayúsculas, minúsculas, números

### Datos de Prueba Recomendados

**Usuario 1 - Juan García**
- Email: juan.garcia.test@example.com
- Contraseña: TestPassword123
- Bloque: 2, Portal: 1, Planta: 1, Letra: A

**Usuario 2 - María López**
- Email: maria.lopez.test@example.com
- Contraseña: TestPassword456
- Bloque: 2, Portal: 1, Planta: 1, Letra: B

**Usuario 3 - Carlos Martín**
- Email: carlos.martin.test@example.com
- Contraseña: TestPassword789
- Bloque: 3, Portal: 2, Planta: 2, Letra: C

### Checklist antes de Testing
- ⚫ Supabase configurado correctamente
- ⚫ Variables de entorno configuradas
- ⚫ Local development server corriendo
- ⚫ Browser console sin errores
- ⚫ Network tab monitoreada
- ⚫ Supabase Dashboard accesible

### Puntos Críticos a Monitorear
1. **Autenticación**: Tokens válidos, sesiones persistentes
2. **Base de datos**: Datos guardados correctamente
3. **Validaciones**: Frontend + Backend
4. **Emails**: Simulados correctamente
5. **Traducciones**: Todos los idiomas funcionales
6. **Responsive**: Desktop, tablet, móvil
7. **Dark mode**: Interfaz legible
8. **Performance**: Carga rápida, sin lag
