-- Migration to update existing profiles table to match our requirements
-- This migration alters the existing table structure

-- Add missing columns if they don't exist
DO $$
BEGIN
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'profiles' 
                  AND column_name = 'updated_at') THEN
        ALTER TABLE public.profiles ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    -- Add role column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'profiles' 
                  AND column_name = 'role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'ENTREPRENEUR';
    END IF;

    -- Add country column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'profiles' 
                  AND column_name = 'country') THEN
        ALTER TABLE public.profiles ADD COLUMN country TEXT;
    END IF;
END $$;

-- Update existing records to have default role
UPDATE public.profiles SET role = 'ENTREPRENEUR' WHERE role IS NULL;

-- Add constraint for role values
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('ENTREPRENEUR', 'MENTOR', 'INVESTOR', 'ADMIN'));

-- Make full_name required
ALTER TABLE public.profiles 
ALTER COLUMN full_name SET NOT NULL;

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create or replace trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Ensure RLS (Row Level Security) is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies and create new ones
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON public.profiles
    FOR DELETE USING (auth.uid() = id);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT ON public.profiles TO anon, authenticated;
GRANT UPDATE ON public.profiles TO anon, authenticated;
GRANT DELETE ON public.profiles TO anon, authenticated;

-- Create index for better performance on user lookups
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(id);

-- Add comments to table and columns
COMMENT ON TABLE public.profiles IS 'User profiles for entrepreneur platform';
COMMENT ON COLUMN public.profiles.id IS 'User ID (references auth.users)';
COMMENT ON COLUMN public.profiles.full_name IS 'User full name';
COMMENT ON COLUMN public.profiles.role IS 'User role: ENTREPRENEUR, MENTOR, INVESTOR, ADMIN';
COMMENT ON COLUMN public.profiles.country IS 'User country';
COMMENT ON COLUMN public.profiles.created_at IS 'Profile creation timestamp';
COMMENT ON COLUMN public.profiles.updated_at IS 'Profile last update timestamp';