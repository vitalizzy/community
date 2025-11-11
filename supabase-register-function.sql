-- ============================================================================
-- FUNCIÓN PARA REGISTRO DE PROPIETARIOS - L2H Community
-- ============================================================================
-- Esta función permite insertar datos de propietarios durante el registro
-- incluso cuando la sesión no está activa (email no confirmado)

-- Crear función para insertar propietario
CREATE OR REPLACE FUNCTION public.create_propietario(
    p_user_id UUID,
    p_nombre TEXT,
    p_email TEXT,
    p_telefono TEXT,
    p_bloque TEXT,
    p_portal TEXT,
    p_planta TEXT,
    p_letra TEXT,
    p_tipo_propietario TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER -- Ejecuta con privilegios del creador de la función
SET search_path = public
AS $$
DECLARE
    result JSON;
BEGIN
    -- Insertar el propietario
    INSERT INTO propietarios (
        user_id,
        nombre,
        email,
        telefono,
        bloque,
        portal,
        planta,
        letra,
        tipo_propietario
    ) VALUES (
        p_user_id,
        p_nombre,
        p_email,
        p_telefono,
        p_bloque,
        p_portal,
        p_planta,
        p_letra,
        p_tipo_propietario
    )
    RETURNING json_build_object(
        'id', id,
        'user_id', user_id,
        'nombre', nombre,
        'email', email,
        'bloque', bloque,
        'portal', portal,
        'planta', planta,
        'letra', letra
    ) INTO result;
    
    RETURN result;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'El email o user_id ya existe';
    WHEN check_violation THEN
        RAISE EXCEPTION 'Datos inválidos: verifica bloque, portal, planta, letra y tipo';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al crear propietario: %', SQLERRM;
END;
$$;

-- Dar permisos de ejecución a usuarios autenticados
GRANT EXECUTE ON FUNCTION public.create_propietario TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_propietario TO anon;

-- Comentario de documentación
COMMENT ON FUNCTION public.create_propietario IS 'Función para crear propietarios durante el registro, ejecutada con privilegios elevados';
