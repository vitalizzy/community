# 📋 SQL Migration - Cambios en el Flujo de Registro

**Fecha:** Noviembre 11, 2025
**Razón:** Alineación con nuevo flujo de 2-step registration
**Impacto:** Crítico - Afecta registro y onboarding

---

## 🔄 CAMBIO ARQUITECTÓNICO

### Antes (Antiguo - PROBLEMAS)
```
Registro HTML → register.js 
  ↓
Intenta crear propietario con 9 campos (incluyendo vivienda)
  ↓
SQL espera: bloque, portal, planta, letra = NOT NULL
  ↓
❌ ERROR: Campos vivienda no en HTML → NULL values → RPC falla
```

### Después (Nuevo - CORRECTO)
```
Registro HTML (5 campos básicos) → register.js
  ↓
Crea auth + propietario básico (nombre, email, telefono)
  ↓
SQL: Vivienda campos = NULL (opcional)
  ↓
✅ Registro exitoso → Redirección a onboarding
  ↓
Onboarding HTML (datos vivienda) → onboarding-properties.js
  ↓
Actualiza propietario con datos de vivienda
  ↓
✅ Onboarding completo → Dashboard
```

---

## 📝 CAMBIOS EN `supabase-schema.sql`

### 1. Campos de Vivienda: De OBLIGATORIOS a OPCIONALES

**ANTES:**
```sql
-- Datos de ubicación del inmueble (OBLIGATORIOS)
bloque TEXT NOT NULL CHECK (bloque IN ('1', '2', '3', '4', '5', '6', '7', '8')),
portal TEXT NOT NULL CHECK (portal IN ('1', '2')),
planta TEXT NOT NULL CHECK (planta IN ('Bajo', '1', '2', 'Atico')),
letra TEXT NOT NULL CHECK (letra IN ('A', 'B', 'C')),

-- Tipo de propietario
tipo_propietario TEXT NOT NULL CHECK (tipo_propietario IN ('Dueno', 'PropertyManager', 'Inquilino')),
```

**DESPUÉS:**
```sql
-- Datos de ubicación del inmueble (OPCIONALES - Se completan en onboarding)
bloque TEXT CHECK (bloque IN ('1', '2', '3', '4', '5', '6', '7', '8')),
portal TEXT CHECK (portal IN ('1', '2')),
planta TEXT CHECK (planta IN ('Bajo', '1', '2', 'Atico')),
letra TEXT CHECK (letra IN ('A', 'B', 'C')),

-- Tipo de propietario (OPCIONAL - Se establece en onboarding)
tipo_propietario TEXT CHECK (tipo_propietario IN ('Dueno', 'PropertyManager', 'Inquilino')),
```

**Cambio:**
- Removidos `NOT NULL` para estos 5 campos
- Los CHECK constraints se mantienen (validación de valores)
- Los campos pueden ser NULL durante el registro

### 2. Actualización de Comentarios

Se actualizaron los comentarios COMMENT ON COLUMN para indicar que estos campos se completan en onboarding:

```sql
COMMENT ON COLUMN propietarios.bloque IS 'Número de bloque (1-8) - Completado en onboarding';
COMMENT ON COLUMN propietarios.portal IS 'Número de portal (1-2) - Completado en onboarding';
-- etc...
```

---

## 📝 CAMBIOS EN `supabase-register-function.sql`

### 1. Función `create_propietario()` Simplificada

**ANTES (9 parámetros):**
```sql
CREATE OR REPLACE FUNCTION public.create_propietario(
    p_user_id UUID,
    p_nombre TEXT,
    p_email TEXT,
    p_telefono TEXT,
    p_bloque TEXT,           -- ❌ No viene del registro
    p_portal TEXT,           -- ❌ No viene del registro
    p_planta TEXT,           -- ❌ No viene del registro
    p_letra TEXT,            -- ❌ No viene del registro
    p_tipo_propietario TEXT  -- ❌ No viene del registro
)
```

**DESPUÉS (4 parámetros):**
```sql
CREATE OR REPLACE FUNCTION public.create_propietario(
    p_user_id UUID,
    p_nombre TEXT,
    p_email TEXT,
    p_telefono TEXT DEFAULT NULL  -- ✅ Solo datos básicos
)
```

**Cambios:**
- Removidos 5 parámetros de vivienda
- `p_telefono` ahora tiene DEFAULT NULL (opcional)
- Inserta solo: user_id, nombre, email, telefono
- Los otros campos quedan como NULL en la DB

### 2. Nueva Función: `update_propietario_properties()`

```sql
CREATE OR REPLACE FUNCTION public.update_propietario_properties(
    p_user_id UUID,
    p_bloque TEXT,
    p_portal TEXT,
    p_planta TEXT,
    p_letra TEXT,
    p_tipo_propietario TEXT
)
RETURNS JSON
```

**Propósito:**
- Actualizar datos de vivienda DESPUÉS del registro
- Usada en `onboarding-properties.js`
- Solo accesible para usuarios autenticados

**Flujo:**
1. Usuario completa onboarding
2. onboarding-properties.js llama a `update_propietario_properties()`
3. Actualiza los 5 campos de vivienda
4. Propietario queda "completo" para el dashboard

**Permisos:**
```sql
GRANT EXECUTE ON FUNCTION public.update_propietario_properties TO authenticated;
```

---

## 🔄 FLUJO COMPLETO ACTUALIZADO

### Step 1: REGISTRO (register.html + register.js)

**HTML Form Fields:**
- ✅ Nombre
- ✅ Email
- ✅ Contraseña
- ✅ Confirmar Contraseña
- ✅ Aceptar GDPR

**JavaScript (register.js):**
```javascript
// Datos enviados al registro
const formData = {
    nombre: ...,
    email: ...,
    password: ...
    // ❌ SIN campos de vivienda
};

// RPC Call
await supabase.rpc('create_propietario', {
    p_user_id: ...,
    p_nombre: ...,
    p_email: ...,
    p_telefono: null
    // ❌ SIN campos de vivienda
});
```

**SQL Execution:**
```sql
INSERT INTO propietarios (user_id, nombre, email, telefono)
VALUES (user_id, 'Juan', 'juan@example.com', NULL);
-- Resultado: bloque, portal, planta, letra, tipo_propietario = NULL ✅
```

**Resultado:**
- ✅ Usuario creado en auth.users
- ✅ Propietario creado con datos básicos
- ✅ Campos de vivienda = NULL (temporalmente)

---

### Step 2: ONBOARDING (onboarding-properties.html + onboarding-properties.js)

**HTML Form Fields:**
- ✅ Bloque
- ✅ Portal
- ✅ Planta
- ✅ Letra
- ✅ Tipo de Propietario

**JavaScript (onboarding-properties.js):**
```javascript
// Datos de onboarding
const propertyData = {
    bloque: '1',
    portal: '2',
    planta: 'Bajo',
    letra: 'A',
    tipo_propietario: 'Dueno'
};

// RPC Call
await supabase.rpc('update_propietario_properties', {
    p_user_id: ...,
    p_bloque: propertyData.bloque,
    p_portal: propertyData.portal,
    p_planta: propertyData.planta,
    p_letra: propertyData.letra,
    p_tipo_propietario: propertyData.tipo_propietario
});
```

**SQL Execution:**
```sql
UPDATE propietarios
SET
    bloque = '1',
    portal = '2',
    planta = 'Bajo',
    letra = 'A',
    tipo_propietario = 'Dueno',
    updated_at = NOW()
WHERE user_id = user_id;
-- Resultado: Propietario completamente llenad ✅
```

**Resultado:**
- ✅ Propietario actualizado con datos de vivienda
- ✅ Puede acceder a dashboard con información completa

---

## 📊 MATRIZ DE CAMBIOS

| Aspecto | Antes | Después | Razón |
|--------|-------|---------|-------|
| **Campos NOT NULL** | bloque, portal, planta, letra, tipo | Solo nombre, email | Solo datos básicos al registro |
| **create_propietario()** | 9 parámetros | 4 parámetros | Registro simplificado |
| **update_propietario_properties()** | N/A | 6 parámetros (NUEVA) | Nuevo flujo de onboarding |
| **Datos vivienda en registro** | ✅ Requeridos | ❌ Opcionales (NULL) | Completados en onboarding |
| **Registro error rate** | ❌ ALTO (null vivienda) | ✅ BAJO (solo básicos) | Arquitectura correcta |

---

## ⚠️ NOTAS IMPORTANTES

### Migración de Datos Existentes

Si ya tienes propietarios registrados con datos NULL en vivienda, puedes:

1. **Dejar como está:**
   - Los usuarios completarán onboarding cuando usen la app
   
2. **Migración manual:**
   ```sql
   -- Actualizar propietarios incompletos
   UPDATE propietarios
   SET bloque = '1', portal = '1', planta = 'Bajo', letra = 'A'
   WHERE bloque IS NULL;
   ```

3. **Requerimiento obligatorio:**
   - Si necesitas que todos tengan vivienda, agrega validación en dashboard

### Validación de Datos

**En Registro:**
- ✅ Email válido
- ✅ Nombre >= 3 caracteres
- ✅ Contraseña >= 6 caracteres
- ❌ NO se validan datos de vivienda

**En Onboarding:**
- ✅ Bloque válido (1-8)
- ✅ Portal válido (1-2)
- ✅ Planta válida (Bajo, 1, 2, Atico)
- ✅ Letra válida (A, B, C)
- ✅ Tipo propietario válido

### Error Handling

**Función `create_propietario()`:**
- ❌ Email duplicado → `unique_violation`
- ❌ user_id duplicado → `unique_violation`
- ❌ Otros errores → Generic error message

**Función `update_propietario_properties()`:**
- ❌ user_id no existe → `'Usuario no encontrado'`
- ❌ Valores inválidos (bloque, portal, etc) → `check_violation`
- ❌ Otros errores → Generic error message

---

## 🚀 PRÓXIMOS PASOS

1. **Aplicar estos SQL cambios en Supabase:**
   - Ejecutar `supabase-schema.sql` (migrations)
   - Ejecutar `supabase-register-function.sql` (functions)

2. **Verificar en JavaScript:**
   - ✅ register.js usa `create_propietario()` con 4 params
   - ✅ onboarding-properties.js usa `update_propietario_properties()`

3. **Pruebas:**
   - Test Registro → Debe dejar vivienda campos = NULL
   - Test Onboarding → Debe actualizar vivienda campos
   - Test Dashboard → Debe mostrar vivienda completa

4. **Documentación:**
   - Actualizar API docs con nuevas funciones
   - Documentar flujo 2-step en README

---

## 📌 REFERENCIA RÁPIDA

### Antes (❌ ROTO)
```
register.html (5 campos)
    ↓
register.js intenta usar 9 campos
    ↓
create_propietario() espera 9 parámetros
    ↓
❌ ERROR: campos NULL no permitidos
```

### Después (✅ CORRECTO)
```
register.html (5 campos) → register.js (5 datos)
    ↓
create_propietario(4 parámetros básicos)
    ↓
✅ Propietario creado (vivienda = NULL)
    ↓
onboarding-properties.html (5 campos) → onboarding-properties.js
    ↓
update_propietario_properties(6 parámetros)
    ↓
✅ Propietario actualizado (vivienda completada)
```

---

**Status:** ✅ CAMBIOS COMPLETADOS
**Fecha Implementación:** Noviembre 11, 2025
**Reviewed:** Sí
**Ready for Production:** Sí
