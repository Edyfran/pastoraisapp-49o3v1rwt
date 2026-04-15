DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('ADMIN', 'COORDENADOR', 'MEMBRO');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
    CREATE TYPE public.user_status AS ENUM ('ATIVO', 'INATIVO');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'escala_status') THEN
    CREATE TYPE public.escala_status AS ENUM ('PENDENTE', 'CONFIRMADA', 'CANCELADA');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role public.user_role NOT NULL DEFAULT 'MEMBRO',
  status public.user_status NOT NULL DEFAULT 'ATIVO',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pastorais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cargos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pastoral_id UUID NOT NULL REFERENCES public.pastorais(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.membros_pastorais (
  membro_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pastoral_id UUID NOT NULL REFERENCES public.pastorais(id) ON DELETE CASCADE,
  is_coordenador BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (membro_id, pastoral_id)
);

CREATE TABLE IF NOT EXISTS public.escalas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pastoral_id UUID NOT NULL REFERENCES public.pastorais(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  status public.escala_status NOT NULL DEFAULT 'PENDENTE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.escala_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escala_id UUID NOT NULL REFERENCES public.escalas(id) ON DELETE CASCADE,
  membro_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  cargo_id UUID NOT NULL REFERENCES public.cargos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pastorais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cargos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membros_pastorais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escala_assignments ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "authenticated_read_profiles" ON public.profiles;
CREATE POLICY "authenticated_read_profiles" ON public.profiles FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_update_profiles" ON public.profiles;
CREATE POLICY "authenticated_update_profiles" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'ADMIN');

DROP POLICY IF EXISTS "authenticated_read_pastorais" ON public.pastorais;
CREATE POLICY "authenticated_read_pastorais" ON public.pastorais FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_pastorais" ON public.pastorais;
CREATE POLICY "authenticated_insert_pastorais" ON public.pastorais FOR INSERT TO authenticated WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'ADMIN');

DROP POLICY IF EXISTS "authenticated_read_cargos" ON public.cargos;
CREATE POLICY "authenticated_read_cargos" ON public.cargos FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_read_membros_pastorais" ON public.membros_pastorais;
CREATE POLICY "authenticated_read_membros_pastorais" ON public.membros_pastorais FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_read_escalas" ON public.escalas;
CREATE POLICY "authenticated_read_escalas" ON public.escalas FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_escalas" ON public.escalas;
CREATE POLICY "authenticated_insert_escalas" ON public.escalas FOR INSERT TO authenticated WITH CHECK (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'ADMIN' OR
  EXISTS (SELECT 1 FROM public.membros_pastorais WHERE membro_id = auth.uid() AND pastoral_id = escalas.pastoral_id AND is_coordenador = true)
);

DROP POLICY IF EXISTS "authenticated_update_escalas" ON public.escalas;
CREATE POLICY "authenticated_update_escalas" ON public.escalas FOR UPDATE TO authenticated USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'ADMIN' OR
  EXISTS (SELECT 1 FROM public.membros_pastorais WHERE membro_id = auth.uid() AND pastoral_id = escalas.pastoral_id AND is_coordenador = true)
);

DROP POLICY IF EXISTS "authenticated_read_escala_assignments" ON public.escala_assignments;
CREATE POLICY "authenticated_read_escala_assignments" ON public.escala_assignments FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_escala_assignments" ON public.escala_assignments;
CREATE POLICY "authenticated_insert_escala_assignments" ON public.escala_assignments FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_escala_assignments" ON public.escala_assignments;
CREATE POLICY "authenticated_update_escala_assignments" ON public.escala_assignments FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_delete_escala_assignments" ON public.escala_assignments;
CREATE POLICY "authenticated_delete_escala_assignments" ON public.escala_assignments FOR DELETE TO authenticated USING (true);

-- Trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'MEMBRO'::public.user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
