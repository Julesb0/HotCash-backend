-- Tabla de perfiles extendidos para usuarios
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'ENTREPRENEUR',
    country TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de planes de negocio
CREATE TABLE business_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    title TEXT NOT NULL,
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_plans ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla profiles
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para la tabla business_plans
CREATE POLICY "Users can view their own business plans" ON business_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own business plans" ON business_plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business plans" ON business_plans
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own business plans" ON business_plans
    FOR DELETE USING (auth.uid() = user_id);

-- Otorgar permisos a los roles de Supabase
GRANT SELECT ON profiles TO anon, authenticated;
GRANT INSERT ON profiles TO anon, authenticated;
GRANT UPDATE ON profiles TO authenticated;

GRANT SELECT ON business_plans TO anon, authenticated;
GRANT INSERT ON business_plans TO authenticated;
GRANT UPDATE ON business_plans TO authenticated;
GRANT DELETE ON business_plans TO authenticated;

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para business_plans
CREATE TRIGGER update_business_plans_updated_at
    BEFORE UPDATE ON business_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();