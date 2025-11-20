-- Agregar campos adicionales a la tabla profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS industry VARCHAR(100),
ADD COLUMN IF NOT EXISTS website VARCHAR(255),
ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255),
ADD COLUMN IF NOT EXISTS location VARCHAR(255),
ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS birth_date DATE,
ADD COLUMN IF NOT EXISTS experience_level VARCHAR(50) DEFAULT 'beginner',
ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS interests TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_mentor BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_investor BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS years_experience INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS company_stage VARCHAR(100),
ADD COLUMN IF NOT EXISTS funding_stage VARCHAR(100),
ADD COLUMN IF NOT EXISTS team_size INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS revenue_range VARCHAR(100),
ADD COLUMN IF NOT EXISTS looking_for TEXT[] DEFAULT '{}';

-- Actualizar la política RLS para permitir actualizaciones
CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
FOR ALL USING (auth.uid() = id);