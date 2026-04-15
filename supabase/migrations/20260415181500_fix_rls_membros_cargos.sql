-- Fix RLS for membros_pastorais
DROP POLICY IF EXISTS "authenticated_insert_membros_pastorais" ON public.membros_pastorais;
CREATE POLICY "authenticated_insert_membros_pastorais" ON public.membros_pastorais
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_membros_pastorais" ON public.membros_pastorais;
CREATE POLICY "authenticated_update_membros_pastorais" ON public.membros_pastorais
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_membros_pastorais" ON public.membros_pastorais;
CREATE POLICY "authenticated_delete_membros_pastorais" ON public.membros_pastorais
  FOR DELETE TO authenticated USING (true);

-- Fix RLS for cargos
DROP POLICY IF EXISTS "authenticated_insert_cargos" ON public.cargos;
CREATE POLICY "authenticated_insert_cargos" ON public.cargos
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_cargos" ON public.cargos;
CREATE POLICY "authenticated_update_cargos" ON public.cargos
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_cargos" ON public.cargos;
CREATE POLICY "authenticated_delete_cargos" ON public.cargos
  FOR DELETE TO authenticated USING (true);
