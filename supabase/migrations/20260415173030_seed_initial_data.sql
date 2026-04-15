DO $$
DECLARE
  admin_id uuid;
  coord_id uuid;
  member_id uuid;
  pastoral1_id uuid;
  cargo1_id uuid;
  cargo2_id uuid;
  escala1_id uuid;
BEGIN
  -- 1. Create Admin
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'edyfrann.2010@gmail.com') THEN
    admin_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      admin_id, '00000000-0000-0000-0000-000000000000', 'edyfrann.2010@gmail.com', crypt('Skip@Pass', gen_salt('bf')), NOW(),
      NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Administrador", "role": "ADMIN"}',
      false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', ''
    );
  ELSE
    SELECT id INTO admin_id FROM auth.users WHERE email = 'edyfrann.2010@gmail.com';
  END IF;

  -- 2. Create Coord
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'coord@exemplo.com') THEN
    coord_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      coord_id, '00000000-0000-0000-0000-000000000000', 'coord@exemplo.com', crypt('Skip@Pass', gen_salt('bf')), NOW(),
      NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Coordenador", "role": "COORDENADOR"}',
      false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', ''
    );
  ELSE
    SELECT id INTO coord_id FROM auth.users WHERE email = 'coord@exemplo.com';
  END IF;

  -- 3. Create Member
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'membro@exemplo.com') THEN
    member_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      member_id, '00000000-0000-0000-0000-000000000000', 'membro@exemplo.com', crypt('Skip@Pass', gen_salt('bf')), NOW(),
      NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Membro", "role": "MEMBRO"}',
      false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', ''
    );
  ELSE
    SELECT id INTO member_id FROM auth.users WHERE email = 'membro@exemplo.com';
  END IF;

  -- 4. Create Pastoral & Data
  IF NOT EXISTS (SELECT 1 FROM public.pastorais WHERE name = 'Ministério de Música') THEN
    INSERT INTO public.pastorais (name, description) VALUES ('Ministério de Música', 'Responsável pela animação musical.') RETURNING id INTO pastoral1_id;
    
    INSERT INTO public.cargos (pastoral_id, name) VALUES (pastoral1_id, 'Vocalista') RETURNING id INTO cargo1_id;
    INSERT INTO public.cargos (pastoral_id, name) VALUES (pastoral1_id, 'Instrumentista') RETURNING id INTO cargo2_id;
    
    INSERT INTO public.membros_pastorais (membro_id, pastoral_id, is_coordenador) VALUES (coord_id, pastoral1_id, true) ON CONFLICT DO NOTHING;
    INSERT INTO public.membros_pastorais (membro_id, pastoral_id, is_coordenador) VALUES (member_id, pastoral1_id, false) ON CONFLICT DO NOTHING;
    
    INSERT INTO public.escalas (pastoral_id, date, status) VALUES (pastoral1_id, NOW() + INTERVAL '7 days', 'CONFIRMADA') RETURNING id INTO escala1_id;
    
    INSERT INTO public.escala_assignments (escala_id, membro_id, cargo_id) VALUES (escala1_id, coord_id, cargo1_id);
    INSERT INTO public.escala_assignments (escala_id, membro_id, cargo_id) VALUES (escala1_id, member_id, cargo2_id);
  END IF;

END $$;
