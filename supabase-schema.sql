-- ============================================================================
-- TABLA PROPIETARIOS - L2H Community
-- ============================================================================
-- Este script crea la tabla principal para almacenar los datos de los propietarios
-- junto con sus políticas de seguridad (RLS - Row Level Security)

-- Crear la tabla propietarios
CREATE TABLE propietarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefono TEXT,
    telefono_confirmado BOOLEAN DEFAULT FALSE,
    gdpr_consent BOOLEAN DEFAULT FALSE,
    gdpr_consent_at TIMESTAMP WITH TIME ZONE,
    
    -- Datos de ubicación del inmueble (OBLIGATORIOS)
    bloque TEXT NOT NULL CHECK (bloque IN ('1', '2', '3', '4', '5', '6', '7', '8')),
    portal TEXT NOT NULL CHECK (portal IN ('1', '2')),
    planta TEXT NOT NULL CHECK (planta IN ('Bajo', '1', '2', 'Atico')),
    letra TEXT NOT NULL CHECK (letra IN ('A', 'B', 'C')),
    
    -- Tipo de propietario
    tipo_propietario TEXT NOT NULL CHECK (tipo_propietario IN ('Dueno', 'PropertyManager', 'Inquilino')),
    
    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento de búsquedas
CREATE INDEX idx_propietarios_user_id ON propietarios(user_id);
CREATE INDEX idx_propietarios_bloque ON propietarios(bloque);
CREATE INDEX idx_propietarios_email ON propietarios(email);
CREATE INDEX idx_propietarios_ubicacion ON propietarios(bloque, portal, planta, letra);

-- Activar Row Level Security (RLS)
ALTER TABLE propietarios ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propios datos
CREATE POLICY "Los usuarios pueden ver sus propios datos"
ON propietarios
FOR SELECT
USING (auth.uid() = user_id);

-- Política: Los usuarios pueden insertar sus propios datos al registrarse
CREATE POLICY "Los usuarios pueden insertar sus propios datos"
ON propietarios
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden actualizar sus propios datos
CREATE POLICY "Los usuarios pueden actualizar sus propios datos"
ON propietarios
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios NO pueden eliminar sus propios datos (seguridad)
-- Si necesitas permitir eliminación, descomenta las siguientes líneas:
-- CREATE POLICY "Los usuarios pueden eliminar sus propios datos"
-- ON propietarios
-- FOR DELETE
-- USING (auth.uid() = user_id);

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en cada UPDATE
CREATE TRIGGER update_propietarios_updated_at
BEFORE UPDATE ON propietarios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Comentarios en la tabla y columnas para documentación
COMMENT ON TABLE propietarios IS 'Tabla principal de propietarios de la comunidad L2H';
COMMENT ON COLUMN propietarios.bloque IS 'Número de bloque (1-8)';
COMMENT ON COLUMN propietarios.portal IS 'Número de portal (1-2)';
COMMENT ON COLUMN propietarios.planta IS 'Planta del inmueble (Bajo, 1, 2, Atico)';
COMMENT ON COLUMN propietarios.letra IS 'Letra del inmueble (A, B, C)';
COMMENT ON COLUMN propietarios.tipo_propietario IS 'Tipo de propietario (Dueno, PropertyManager, Inquilino)';

-- Comentarios adicionales
COMMENT ON COLUMN propietarios.telefono_confirmado IS 'Indica si el número de teléfono ha sido verificado manualmente.';
COMMENT ON COLUMN propietarios.gdpr_consent IS 'Marca si el propietario aceptó la política de privacidad.';
COMMENT ON COLUMN propietarios.gdpr_consent_at IS 'Fecha de aceptación del consentimiento GDPR.';

-- ============================================================================
-- TABLA PROPIEDADES ADICIONALES - Permite múltiples viviendas por usuario
-- ============================================================================

CREATE TABLE propiedades_adicionales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    bloque TEXT NOT NULL CHECK (bloque IN ('1', '2', '3', '4', '5', '6', '7', '8')),
    portal TEXT NOT NULL CHECK (portal IN ('1', '2')),
    planta TEXT NOT NULL CHECK (planta IN ('Bajo', '1', '2', 'Atico')),
    letra TEXT NOT NULL CHECK (letra IN ('A', 'B', 'C')),
    alias TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, bloque, portal, planta, letra)
);

CREATE INDEX idx_propiedades_adicionales_user_id ON propiedades_adicionales(user_id);
CREATE INDEX idx_propiedades_adicionales_ubicacion ON propiedades_adicionales(bloque, portal, planta, letra);

ALTER TABLE propiedades_adicionales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Los usuarios pueden ver sus viviendas adicionales"
ON propiedades_adicionales
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar sus viviendas adicionales"
ON propiedades_adicionales
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus viviendas adicionales"
ON propiedades_adicionales
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus viviendas adicionales"
ON propiedades_adicionales
FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_propiedades_adicionales_updated_at
BEFORE UPDATE ON propiedades_adicionales
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE propiedades_adicionales IS 'Viviendas adicionales asociadas a un usuario de L2H.';
COMMENT ON COLUMN propiedades_adicionales.alias IS 'Nombre interno opcional para identificar la vivienda.';

-- ============================================================================
-- FUNCIÓN PARA LISTAR VECINOS EN LAS MISMAS VIVIENDAS
-- ============================================================================

CREATE OR REPLACE FUNCTION get_neighbors_for_user_properties(p_user_id UUID)
RETURNS TABLE (
    propiedad TEXT,
    nombre TEXT,
    email TEXT,
    tipo_propietario TEXT,
    es_usuario_actual BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
    RETURN QUERY
    WITH user_properties AS (
        SELECT bloque, portal, planta, letra
        FROM propietarios
        WHERE user_id = p_user_id
        UNION
        SELECT bloque, portal, planta, letra
        FROM propiedades_adicionales
        WHERE user_id = p_user_id
    )
    SELECT CONCAT('Bloque ', up.bloque, ' - Portal ', up.portal, ' - ', up.planta, 'º ', up.letra) AS propiedad,
           p.nombre,
           p.email,
           p.tipo_propietario,
           p.user_id = p_user_id AS es_usuario_actual
    FROM user_properties up
    JOIN propietarios p
      ON p.bloque = up.bloque
     AND p.portal = up.portal
     AND p.planta = up.planta
     AND p.letra = up.letra
    ORDER BY propiedad, p.nombre;
END;
$$;

GRANT EXECUTE ON FUNCTION get_neighbors_for_user_properties(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_neighbors_for_user_properties(UUID) TO service_role;
