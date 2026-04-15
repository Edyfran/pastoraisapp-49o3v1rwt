CREATE TABLE IF NOT EXISTS public.membro_cargos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membro_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cargo_id UUID NOT NULL REFERENCES public.cargos(id) ON DELETE CASCADE,
  pastoral_id UUID NOT NULL REFERENCES public.pastorais(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(membro_id, cargo_id)
);

ALTER TABLE public.membro_cargos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_all_membro_cargos" ON public.membro_cargos;
CREATE POLICY "authenticated_all_membro_cargos" ON public.membro_cargos
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
