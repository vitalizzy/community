# 🚀 Aplicar Cambios SQL en Supabase

**Fecha:** Noviembre 11, 2025
**Objetivo:** Actualizar schema y funciones para nuevo flujo de 2-step registration

---

## 📋 PASO 1: Acceder a Supabase SQL Editor

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Haz click en **SQL Editor** (lado izquierdo)
4. Haz click en **New Query**

---

## 📋 PASO 2: Ejecutar Migration de Schema

### En el SQL Editor, ejecuta este script:

```sql
-- ============================================================================
-- MIGRATION: Cambiar campos de vivienda a OPCIONAL
-- ============================================================================
-- Estos cambios permiten crear propietarios sin datos de vivienda durante registro
-- Los datos de vivienda se completan después en onboarding

-- 1. Modificar tabla propietarios - hacer campos de vivienda OPCIONAL
ALTER TABLE propietarios
  ALTER COLUMN bloque DROP NOT NULL;

ALTER TABLE propietarios
  ALTER COLUMN portal DROP NOT NULL;

ALTER TABLE propietarios
  ALTER COLUMN planta DROP NOT NULL;

ALTER TABLE propietarios
  ALTER COLUMN letra DROP NOT NULL;

ALTER TABLE propietarios
  ALTER COLUMN tipo_propietario DROP NOT NULL;

-- 2. Agregar comentarios actualizados
COMMENT ON COLUMN propietarios.bloque IS 'Número de bloque (1-8) - Completado en onboarding';
COMMENT ON COLUMN propietarios.portal IS 'Número de portal (1-2) - Completado en onboarding';
COMMENT ON COLUMN propietarios.planta IS 'Planta del inmueble (Bajo, 1, 2, Atico) - Completado en onboarding';
COMMENT ON COLUMN propietarios.letra IS 'Letra del inmueble (A, B, C) - Completado en onboarding';
COMMENT ON COLUMN propietarios.tipo_propietario IS 'Tipo de propietario (Dueno, PropertyManager, Inquilino) - Completado en onboarding';
```

**Resultado esperado:** ✅ No debería haber errores

---

## 📋 PASO 3: Ejecutar Migration de Funciones

### En el SQL Editor, ejecuta este script:

```sql
-- ============================================================================
-- MIGRATION: Actualizar funciones para nuevo flujo
-- ============================================================================

-- 1. Eliminar función antigua (versión con 9 parámetros)
DROP FUNCTION IF EXISTS public.create_propietario(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) CASCADE;

-- 2. Crear función NUEVA: create_propietario (SOLO DATOS BÁSICOS)
CREATE OR REPLACE FUNCTION public.create_propietario(
    p_user_id UUID,
    p_nombre TEXT,
    p_email TEXT,
    p_telefono TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result JSON;
BEGIN
    -- Insertar el propietario con solo datos básicos
    INSERT INTO propietarios (
        user_id,
        nombre,
        email,
        telefono
    ) VALUES (
        p_user_id,
        p_nombre,
        p_email,
        p_telefono
    )
    RETURNING json_build_object(
        'id', id,
        'user_id', user_id,
        'nombre', nombre,
        'email', email,
        'created_at', created_at
    ) INTO result;
    
    RETURN result;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'El email o user_id ya existe';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al crear propietario: %', SQLERRM;
END;
$$;

-- 3. Crear función NUEVA: update_propietario_properties (PARA ONBOARDING)
CREATE OR REPLACE FUNCTION public.update_propietario_properties(
    p_user_id UUID,
    p_bloque TEXT,
    p_portal TEXT,
    p_planta TEXT,
    p_letra TEXT,
    p_tipo_propietario TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result JSON;
BEGIN
    -- Actualizar los datos de vivienda del propietario
    UPDATE propietarios
    SET
        bloque = p_bloque,
        portal = p_portal,
        planta = p_planta,
        letra = p_letra,
        tipo_propietario = p_tipo_propietario,
        updated_at = NOW()
    WHERE user_id = p_user_id
    RETURNING json_build_object(
        'id', id,
        'user_id', user_id,
        'nombre', nombre,
        'bloque', bloque,
        'portal', portal,
        'planta', planta,
        'letra', letra,
        'tipo_propietario', tipo_propietario,
        'updated_at', updated_at
    ) INTO result;
    
    IF result IS NULL THEN
        RAISE EXCEPTION 'Usuario no encontrado';
    END IF;
    
    RETURN result;
EXCEPTION
    WHEN check_violation THEN
        RAISE EXCEPTION 'Datos inválidos: verifica bloque, portal, planta, letra y tipo_propietario';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al actualizar propietario: %', SQLERRM;
END;
$$;

-- 4. Dar permisos de ejecución
GRANT EXECUTE ON FUNCTION public.create_propietario TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_propietario TO anon;
GRANT EXECUTE ON FUNCTION public.update_propietario_properties TO authenticated;

-- 5. Agregar comentarios de documentación
COMMENT ON FUNCTION public.create_propietario IS 'Crea propietario con solo datos básicos durante el registro';
COMMENT ON FUNCTION public.update_propietario_properties IS 'Actualiza datos de vivienda del propietario durante el onboarding';
```

**Resultado esperado:** ✅ No debería haber errores

---

## ✅ VERIFICACIÓN: Confirmar que todo funciona

Después de ejecutar los scripts anteriores, ejecuta estas queries de prueba:

### Test 1: Verificar que se puede crear propietario sin vivienda

```sql
-- Test: Crear propietario con datos básicos (sin vivienda)
SELECT public.create_propietario(
    '550e8400-e29b-41d4-a716-446655440000'::uuid,
    'Juan García',
    'juan@test.com',
    NULL
);
```

**Resultado esperado:**
```json
{
  "id": "...",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "nombre": "Juan García",
  "email": "juan@test.com",
  "created_at": "2025-11-11T..."
}
```

### Test 2: Verificar que se puede actualizar vivienda

```sql
-- Test: Actualizar datos de vivienda
SELECT public.update_propietario_properties(
    '550e8400-e29b-41d4-a716-446655440000'::uuid,
    '1',
    '2',
    'Bajo',
    'A',
    'Dueno'
);
```

**Resultado esperado:**
```json
{
  "id": "...",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "nombre": "Juan García",
  "bloque": "1",
  "portal": "2",
  "planta": "Bajo",
  "letra": "A",
  "tipo_propietario": "Dueno",
  "updated_at": "2025-11-11T..."
}
```

### Test 3: Verificar que propietario se actualizó

```sql
-- Consultar propietario actualizado
SELECT * FROM propietarios 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'::uuid;
```

**Resultado esperado:** Propietario completo con vivienda data

---

## 📊 Resumen de Cambios Aplicados

| Elemento | Cambio | Estado |
|----------|--------|--------|
| **Campos NOT NULL** | bloque, portal, planta, letra, tipo_propietario → NULL allowed | ✅ Migrado |
| **create_propietario()** | 9 parámetros → 4 parámetros | ✅ Recreada |
| **update_propietario_properties()** | Nueva función para onboarding | ✅ Creada |
| **Comentarios** | Actualizados con info de onboarding | ✅ Actualizado |
| **Permisos** | GRANT EXECUTE | ✅ Asignados |

---

## 🔄 Flujo Completo Ahora

```
1. REGISTRO (register.html)
   ↓
   register.js → create_propietario(user_id, nombre, email, telefono)
   ↓
   ✅ Propietario creado (vivienda campos = NULL)
   
2. ONBOARDING (onboarding-properties.html)
   ↓
   onboarding-properties.js → update_propietario_properties(...)
   ↓
   ✅ Propietario actualizado (vivienda datos completados)
   
3. DASHBOARD (dashboard.html)
   ↓
   dashboard-auth.js → SELECT propietarios WHERE user_id = current_user
   ↓
   ✅ Propietario completamente lleno con vivienda data
```

---

## ⚠️ IMPORTANT: Limpieza de Datos de Prueba

Si ejecutaste los tests, necesitas limpiar el user_id de prueba:

```sql
-- Eliminar propietario de prueba
DELETE FROM propietarios 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'::uuid;
```

---

## ✨ Checklist Final

- [ ] Ejecuté ALTER TABLE para hacer campos NULL
- [ ] Ejecuté DROP FUNCTION para eliminar versión antigua
- [ ] Ejecuté CREATE FUNCTION para create_propietario (4 parámetros)
- [ ] Ejecuté CREATE FUNCTION para update_propietario_properties
- [ ] Ejecuté GRANT EXECUTE para permisos
- [ ] Test 1 pasó (crear propietario sin vivienda)
- [ ] Test 2 pasó (actualizar vivienda)
- [ ] Test 3 pasó (verificar propietario)
- [ ] Limpié datos de prueba
- [ ] ✅ LISTO PARA USAR EN PRODUCCIÓN

---

## 🆘 Si hay errores

### Error: "function name not unique"
**Causa:** Función antigua aún existe
**Solución:** Ejecuta `DROP FUNCTION IF EXISTS public.create_propietario(...)` con la firma correcta

### Error: "column does not exist"
**Causa:** Tabla propietarios no tiene las columnas esperadas
**Solución:** Verifica que la tabla exista con: `SELECT * FROM propietarios LIMIT 1;`

### Error: "permission denied"
**Causa:** Usuario no tiene permisos
**Solución:** Asegúrate de usar `SECURITY DEFINER` en las funciones

### Error: "cannot drop function"
**Causa:** Función está siendo usada por otros objetos
**Solución:** Usa `DROP FUNCTION IF EXISTS ... CASCADE;`

---

## 📞 Referencia Rápida

**Archivo de schema:** `supabase-schema.sql`
**Archivo de funciones:** `supabase-register-function.sql`
**Documentación:** `SQL-MIGRATION-NOTES.md`

**Status:** ✅ LISTO PARA APLICAR
**Fecha:** Noviembre 11, 2025
