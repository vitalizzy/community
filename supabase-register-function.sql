-- ============================================================================
-- FUNCIÓN PARA REGISTRO DE PROPIETARIOS - L2H Community
-- ============================================================================
-- Esta función permite insertar datos básicos de propietarios durante el registro
-- Los datos de vivienda se completan después en el onboarding

-- Crear función para insertar propietario (SOLO DATOS BÁSICOS)
CREATE OR REPLACE FUNCTION public.create_propietario(
    p_user_id UUID,
    p_nombre TEXT,
    p_email TEXT,
    p_telefono TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER -- Ejecuta con privilegios del creador de la función
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

-- ============================================================================
-- FUNCIÓN PARA ACTUALIZAR DATOS DE VIVIENDA - Usada en onboarding
-- ============================================================================
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

-- Dar permisos de ejecución a usuarios autenticados
GRANT EXECUTE ON FUNCTION public.create_propietario TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_propietario TO anon;
GRANT EXECUTE ON FUNCTION public.update_propietario_properties TO authenticated;

-- Comentarios de documentación
COMMENT ON FUNCTION public.create_propietario IS 'Crea propietario con solo datos básicos durante el registro';
COMMENT ON FUNCTION public.update_propietario_properties IS 'Actualiza datos de vivienda del propietario durante el onboarding';
