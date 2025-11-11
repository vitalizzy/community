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
