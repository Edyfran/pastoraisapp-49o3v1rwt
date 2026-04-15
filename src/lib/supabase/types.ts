// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      cargos: {
        Row: {
          created_at: string
          id: string
          name: string
          pastoral_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          pastoral_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          pastoral_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cargos_pastoral_id_fkey"
            columns: ["pastoral_id"]
            isOneToOne: false
            referencedRelation: "pastorais"
            referencedColumns: ["id"]
          },
        ]
      }
      escala_assignments: {
        Row: {
          cargo_id: string
          created_at: string
          escala_id: string
          id: string
          membro_id: string | null
        }
        Insert: {
          cargo_id: string
          created_at?: string
          escala_id: string
          id?: string
          membro_id?: string | null
        }
        Update: {
          cargo_id?: string
          created_at?: string
          escala_id?: string
          id?: string
          membro_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "escala_assignments_cargo_id_fkey"
            columns: ["cargo_id"]
            isOneToOne: false
            referencedRelation: "cargos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escala_assignments_escala_id_fkey"
            columns: ["escala_id"]
            isOneToOne: false
            referencedRelation: "escalas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escala_assignments_membro_id_fkey"
            columns: ["membro_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      escalas: {
        Row: {
          created_at: string
          date: string
          id: string
          pastoral_id: string
          status: Database["public"]["Enums"]["escala_status"]
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          pastoral_id: string
          status?: Database["public"]["Enums"]["escala_status"]
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          pastoral_id?: string
          status?: Database["public"]["Enums"]["escala_status"]
        }
        Relationships: [
          {
            foreignKeyName: "escalas_pastoral_id_fkey"
            columns: ["pastoral_id"]
            isOneToOne: false
            referencedRelation: "pastorais"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          address: string | null
          birth_date: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          first_name: string
          id: number
          last_name: string
          phone_number: string | null
          status: Database["public"]["Enums"]["member_status_enum"]
          updated_at: string
          user_id: number | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          first_name: string
          id: number
          last_name: string
          phone_number?: string | null
          status?: Database["public"]["Enums"]["member_status_enum"]
          updated_at?: string
          user_id?: number | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          first_name?: string
          id?: number
          last_name?: string
          phone_number?: string | null
          status?: Database["public"]["Enums"]["member_status_enum"]
          updated_at?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      membros_pastorais: {
        Row: {
          created_at: string
          is_coordenador: boolean
          membro_id: string
          pastoral_id: string
        }
        Insert: {
          created_at?: string
          is_coordenador?: boolean
          membro_id: string
          pastoral_id: string
        }
        Update: {
          created_at?: string
          is_coordenador?: boolean
          membro_id?: string
          pastoral_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "membros_pastorais_membro_id_fkey"
            columns: ["membro_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membros_pastorais_pastoral_id_fkey"
            columns: ["pastoral_id"]
            isOneToOne: false
            referencedRelation: "pastorais"
            referencedColumns: ["id"]
          },
        ]
      }
      pastorais: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      pastoral_coordinators: {
        Row: {
          assigned_at: string
          created_at: string
          id: number
          pastoral_id: number
          revoked_at: string | null
          updated_at: string
          user_id: number
        }
        Insert: {
          assigned_at?: string
          created_at?: string
          id: number
          pastoral_id: number
          revoked_at?: string | null
          updated_at?: string
          user_id: number
        }
        Update: {
          assigned_at?: string
          created_at?: string
          id?: number
          pastoral_id?: number
          revoked_at?: string | null
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_pastoral_coordinators_pastoral_id_fkey"
            columns: ["pastoral_id"]
            isOneToOne: false
            referencedRelation: "pastorals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_pastoral_coordinators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pastoral_members: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          joined_at: string
          left_at: string | null
          member_id: number
          pastoral_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id: number
          joined_at?: string
          left_at?: string | null
          member_id: number
          pastoral_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          joined_at?: string
          left_at?: string | null
          member_id?: number
          pastoral_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_pastoral_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_pastoral_members_pastoral_id_fkey"
            columns: ["pastoral_id"]
            isOneToOne: false
            referencedRelation: "pastorals"
            referencedColumns: ["id"]
          },
        ]
      }
      pastorals: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id: number
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_status"]
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          is_active: boolean
          name: string
          pastoral_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id: number
          is_active?: boolean
          name: string
          pastoral_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean
          name?: string
          pastoral_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_roles_pastoral_id_fkey"
            columns: ["pastoral_id"]
            isOneToOne: false
            referencedRelation: "pastorals"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_items: {
        Row: {
          created_at: string
          id: number
          item_date: string
          member_id: number
          notes: string | null
          role_id: number
          schedule_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: number
          item_date: string
          member_id: number
          notes?: string | null
          role_id: number
          schedule_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          item_date?: string
          member_id?: number
          notes?: string | null
          role_id?: number
          schedule_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_schedule_items_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_schedule_items_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_schedule_items_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          end_date: string
          id: number
          name: string
          pastoral_id: number
          schedule_date: string | null
          start_date: string
          status: Database["public"]["Enums"]["schedule_status_enum"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_date: string
          id: number
          name: string
          pastoral_id: number
          schedule_date?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["schedule_status_enum"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_date?: string
          id?: number
          name?: string
          pastoral_id?: number
          schedule_date?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["schedule_status_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_schedules_pastoral_id_fkey"
            columns: ["pastoral_id"]
            isOneToOne: false
            referencedRelation: "pastorals"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string
          id: number
          is_active: boolean
          name: string
          password_hash: string
          phone_number: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type_enum"]
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email: string
          id: number
          is_active?: boolean
          name: string
          password_hash: string
          phone_number?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type_enum"]
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          email?: string
          id?: number
          is_active?: boolean
          name?: string
          password_hash?: string
          phone_number?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type_enum"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      escala_status: "PENDENTE" | "CONFIRMADA" | "CANCELADA"
      member_status_enum: "active" | "inactive" | "transferred"
      schedule_status_enum: "draft" | "published" | "completed" | "cancelled"
      user_role: "ADMIN" | "COORDENADOR" | "MEMBRO"
      user_status: "ATIVO" | "INATIVO"
      user_type_enum: "admin" | "coordinator" | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      escala_status: ["PENDENTE", "CONFIRMADA", "CANCELADA"],
      member_status_enum: ["active", "inactive", "transferred"],
      schedule_status_enum: ["draft", "published", "completed", "cancelled"],
      user_role: ["ADMIN", "COORDENADOR", "MEMBRO"],
      user_status: ["ATIVO", "INATIVO"],
      user_type_enum: ["admin", "coordinator", "member"],
    },
  },
} as const


// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: cargos
//   id: uuid (not null, default: gen_random_uuid())
//   pastoral_id: uuid (not null)
//   name: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: escala_assignments
//   id: uuid (not null, default: gen_random_uuid())
//   escala_id: uuid (not null)
//   membro_id: uuid (nullable)
//   cargo_id: uuid (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: escalas
//   id: uuid (not null, default: gen_random_uuid())
//   pastoral_id: uuid (not null)
//   date: timestamp with time zone (not null)
//   status: escala_status (not null, default: 'PENDENTE'::escala_status)
//   created_at: timestamp with time zone (not null, default: now())
// Table: members
//   id: integer (not null)
//   user_id: integer (nullable)
//   first_name: character varying (not null)
//   last_name: character varying (not null)
//   birth_date: date (nullable)
//   address: character varying (nullable)
//   phone_number: character varying (nullable)
//   email: character varying (nullable)
//   status: member_status_enum (not null, default: 'active'::member_status_enum)
//   created_at: timestamp without time zone (not null, default: now())
//   updated_at: timestamp without time zone (not null, default: now())
//   deleted_at: timestamp without time zone (nullable)
// Table: membros_pastorais
//   membro_id: uuid (not null)
//   pastoral_id: uuid (not null)
//   is_coordenador: boolean (not null, default: false)
//   created_at: timestamp with time zone (not null, default: now())
// Table: pastorais
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   description: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: pastoral_coordinators
//   id: integer (not null)
//   pastoral_id: integer (not null)
//   user_id: integer (not null)
//   assigned_at: timestamp without time zone (not null, default: now())
//   revoked_at: timestamp without time zone (nullable)
//   created_at: timestamp without time zone (not null, default: now())
//   updated_at: timestamp without time zone (not null, default: now())
// Table: pastoral_members
//   id: integer (not null)
//   pastoral_id: integer (not null)
//   member_id: integer (not null)
//   joined_at: timestamp without time zone (not null, default: now())
//   left_at: timestamp without time zone (nullable)
//   created_at: timestamp without time zone (not null, default: now())
//   updated_at: timestamp without time zone (not null, default: now())
//   deleted_at: timestamp without time zone (nullable)
// Table: pastorals
//   id: integer (not null)
//   name: character varying (not null)
//   description: text (nullable)
//   is_active: boolean (not null, default: true)
//   created_at: timestamp without time zone (not null, default: now())
//   updated_at: timestamp without time zone (not null, default: now())
//   deleted_at: timestamp without time zone (nullable)
// Table: profiles
//   id: uuid (not null)
//   email: text (not null)
//   name: text (not null)
//   phone: text (nullable)
//   role: user_role (not null, default: 'MEMBRO'::user_role)
//   status: user_status (not null, default: 'ATIVO'::user_status)
//   created_at: timestamp with time zone (not null, default: now())
// Table: roles
//   id: integer (not null)
//   pastoral_id: integer (not null)
//   name: character varying (not null)
//   description: text (nullable)
//   is_active: boolean (not null, default: true)
//   created_at: timestamp without time zone (not null, default: now())
//   updated_at: timestamp without time zone (not null, default: now())
//   deleted_at: timestamp without time zone (nullable)
// Table: schedule_items
//   id: integer (not null)
//   schedule_id: integer (not null)
//   member_id: integer (not null)
//   role_id: integer (not null)
//   item_date: date (not null)
//   notes: text (nullable)
//   created_at: timestamp without time zone (not null, default: now())
//   updated_at: timestamp without time zone (not null, default: now())
// Table: schedules
//   id: integer (not null)
//   pastoral_id: integer (not null)
//   name: character varying (not null)
//   description: text (nullable)
//   schedule_date: date (nullable)
//   start_date: date (not null)
//   end_date: date (not null)
//   status: schedule_status_enum (not null, default: 'draft'::schedule_status_enum)
//   created_at: timestamp without time zone (not null, default: now())
//   updated_at: timestamp without time zone (not null, default: now())
//   deleted_at: timestamp without time zone (nullable)
// Table: users
//   id: integer (not null)
//   name: character varying (not null)
//   email: character varying (not null)
//   password_hash: character varying (not null)
//   phone_number: character varying (nullable)
//   user_type: user_type_enum (not null, default: 'member'::user_type_enum)
//   is_active: boolean (not null, default: true)
//   created_at: timestamp without time zone (not null, default: now())
//   updated_at: timestamp without time zone (not null, default: now())
//   deleted_at: timestamp without time zone (nullable)

// --- CONSTRAINTS ---
// Table: cargos
//   FOREIGN KEY cargos_pastoral_id_fkey: FOREIGN KEY (pastoral_id) REFERENCES pastorais(id) ON DELETE CASCADE
//   PRIMARY KEY cargos_pkey: PRIMARY KEY (id)
// Table: escala_assignments
//   FOREIGN KEY escala_assignments_cargo_id_fkey: FOREIGN KEY (cargo_id) REFERENCES cargos(id) ON DELETE CASCADE
//   FOREIGN KEY escala_assignments_escala_id_fkey: FOREIGN KEY (escala_id) REFERENCES escalas(id) ON DELETE CASCADE
//   FOREIGN KEY escala_assignments_membro_id_fkey: FOREIGN KEY (membro_id) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY escala_assignments_pkey: PRIMARY KEY (id)
// Table: escalas
//   FOREIGN KEY escalas_pastoral_id_fkey: FOREIGN KEY (pastoral_id) REFERENCES pastorais(id) ON DELETE CASCADE
//   PRIMARY KEY escalas_pkey: PRIMARY KEY (id)
// Table: members
//   UNIQUE members_email_key: UNIQUE (email)
//   UNIQUE members_phone_number_key: UNIQUE (phone_number)
//   PRIMARY KEY members_pkey: PRIMARY KEY (id)
//   UNIQUE members_user_id_key: UNIQUE (user_id)
//   FOREIGN KEY public_members_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id)
// Table: membros_pastorais
//   FOREIGN KEY membros_pastorais_membro_id_fkey: FOREIGN KEY (membro_id) REFERENCES profiles(id) ON DELETE CASCADE
//   FOREIGN KEY membros_pastorais_pastoral_id_fkey: FOREIGN KEY (pastoral_id) REFERENCES pastorais(id) ON DELETE CASCADE
//   PRIMARY KEY membros_pastorais_pkey: PRIMARY KEY (membro_id, pastoral_id)
// Table: pastorais
//   PRIMARY KEY pastorais_pkey: PRIMARY KEY (id)
// Table: pastoral_coordinators
//   PRIMARY KEY pastoral_coordinators_pkey: PRIMARY KEY (id)
//   FOREIGN KEY public_pastoral_coordinators_pastoral_id_fkey: FOREIGN KEY (pastoral_id) REFERENCES pastorals(id)
//   FOREIGN KEY public_pastoral_coordinators_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id)
// Table: pastoral_members
//   PRIMARY KEY pastoral_members_pkey: PRIMARY KEY (id)
//   FOREIGN KEY public_pastoral_members_member_id_fkey: FOREIGN KEY (member_id) REFERENCES members(id)
//   FOREIGN KEY public_pastoral_members_pastoral_id_fkey: FOREIGN KEY (pastoral_id) REFERENCES pastorals(id)
// Table: pastorals
//   UNIQUE pastorals_name_key: UNIQUE (name)
//   PRIMARY KEY pastorals_pkey: PRIMARY KEY (id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: roles
//   FOREIGN KEY public_roles_pastoral_id_fkey: FOREIGN KEY (pastoral_id) REFERENCES pastorals(id)
//   PRIMARY KEY roles_pkey: PRIMARY KEY (id)
// Table: schedule_items
//   FOREIGN KEY public_schedule_items_member_id_fkey: FOREIGN KEY (member_id) REFERENCES members(id)
//   FOREIGN KEY public_schedule_items_role_id_fkey: FOREIGN KEY (role_id) REFERENCES roles(id)
//   FOREIGN KEY public_schedule_items_schedule_id_fkey: FOREIGN KEY (schedule_id) REFERENCES schedules(id)
//   PRIMARY KEY schedule_items_pkey: PRIMARY KEY (id)
// Table: schedules
//   FOREIGN KEY public_schedules_pastoral_id_fkey: FOREIGN KEY (pastoral_id) REFERENCES pastorals(id)
//   PRIMARY KEY schedules_pkey: PRIMARY KEY (id)
// Table: users
//   UNIQUE users_email_key: UNIQUE (email)
//   UNIQUE users_phone_number_key: UNIQUE (phone_number)
//   PRIMARY KEY users_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: cargos
//   Policy "authenticated_delete_cargos" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert_cargos" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_read_cargos" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_cargos" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: escala_assignments
//   Policy "authenticated_delete_escala_assignments" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert_escala_assignments" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_read_escala_assignments" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_escala_assignments" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: escalas
//   Policy "authenticated_insert_escalas" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: ((( SELECT profiles.role    FROM profiles   WHERE (profiles.id = auth.uid())) = 'ADMIN'::user_role) OR (EXISTS ( SELECT 1    FROM membros_pastorais   WHERE ((membros_pastorais.membro_id = auth.uid()) AND (membros_pastorais.pastoral_id = escalas.pastoral_id) AND (membros_pastorais.is_coordenador = true)))))
//   Policy "authenticated_read_escalas" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_escalas" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: ((( SELECT profiles.role    FROM profiles   WHERE (profiles.id = auth.uid())) = 'ADMIN'::user_role) OR (EXISTS ( SELECT 1    FROM membros_pastorais   WHERE ((membros_pastorais.membro_id = auth.uid()) AND (membros_pastorais.pastoral_id = escalas.pastoral_id) AND (membros_pastorais.is_coordenador = true)))))
// Table: membros_pastorais
//   Policy "authenticated_delete_membros_pastorais" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert_membros_pastorais" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_read_membros_pastorais" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_membros_pastorais" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: pastorais
//   Policy "authenticated_insert_pastorais" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (( SELECT profiles.role    FROM profiles   WHERE (profiles.id = auth.uid())) = 'ADMIN'::user_role)
//   Policy "authenticated_read_pastorais" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: profiles
//   Policy "authenticated_read_profiles" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_profiles" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: ((auth.uid() = id) OR (( SELECT profiles_1.role    FROM profiles profiles_1   WHERE (profiles_1.id = auth.uid())) = 'ADMIN'::user_role))

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.profiles (id, email, name, role)
//     VALUES (
//       NEW.id,
//       NEW.email,
//       COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
//       COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'MEMBRO'::public.user_role)
//     );
//     RETURN NEW;
//   END;
//   $function$
//   

// --- INDEXES ---
// Table: members
//   CREATE UNIQUE INDEX members_email_idx ON public.members USING btree (email)
//   CREATE UNIQUE INDEX members_email_key ON public.members USING btree (email)
//   CREATE INDEX members_first_name_idx ON public.members USING btree (first_name)
//   CREATE INDEX members_last_name_idx ON public.members USING btree (last_name)
//   CREATE UNIQUE INDEX members_phone_number_idx ON public.members USING btree (phone_number)
//   CREATE UNIQUE INDEX members_phone_number_key ON public.members USING btree (phone_number)
//   CREATE UNIQUE INDEX members_user_id_key ON public.members USING btree (user_id)
// Table: pastoral_coordinators
//   CREATE UNIQUE INDEX pastoral_coordinators_pastoral_id_user_id_idx ON public.pastoral_coordinators USING btree (pastoral_id, user_id)
// Table: pastoral_members
//   CREATE UNIQUE INDEX pastoral_members_pastoral_id_member_id_idx ON public.pastoral_members USING btree (pastoral_id, member_id)
// Table: pastorals
//   CREATE UNIQUE INDEX pastorals_name_key ON public.pastorals USING btree (name)
// Table: roles
//   CREATE UNIQUE INDEX roles_pastoral_id_name_idx ON public.roles USING btree (pastoral_id, name)
// Table: schedule_items
//   CREATE INDEX schedule_items_item_date_idx ON public.schedule_items USING btree (item_date)
//   CREATE INDEX schedule_items_member_id_idx ON public.schedule_items USING btree (member_id)
//   CREATE INDEX schedule_items_role_id_idx ON public.schedule_items USING btree (role_id)
//   CREATE INDEX schedule_items_schedule_id_idx ON public.schedule_items USING btree (schedule_id)
//   CREATE UNIQUE INDEX schedule_items_schedule_id_member_id_role_id_item_date_idx ON public.schedule_items USING btree (schedule_id, member_id, role_id, item_date)
// Table: schedules
//   CREATE INDEX schedules_pastoral_id_idx ON public.schedules USING btree (pastoral_id)
//   CREATE INDEX schedules_pastoral_id_start_date_idx ON public.schedules USING btree (pastoral_id, start_date)
// Table: users
//   CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email)
//   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email)
//   CREATE UNIQUE INDEX users_phone_number_idx ON public.users USING btree (phone_number)
//   CREATE UNIQUE INDEX users_phone_number_key ON public.users USING btree (phone_number)

