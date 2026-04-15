import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export interface Pastoral {
  id: string
  name: string
  description: string | null
  cargos: Cargo[]
  coordenadoresIds: string[]
}
export interface Membro {
  id: string
  name: string
  email: string
  phone: string | null
  status: string
  role: string
  pastoralIds: string[]
}
export interface Escala {
  id: string
  pastoralId: string
  date: string
  status: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA'
  assignments: {
    id?: string
    cargoId: string
    membroId?: string
  }[]
}
export interface Cargo {
  id: string
  name: string
}

interface DataState {
  pastorais: Pastoral[]
  membros: Membro[]
  escalas: Escala[]
  loading: boolean
  addEscala: (escala: Omit<Escala, 'id'>) => Promise<void>
  updateEscala: (escala: Escala) => Promise<void>
  addMembro: (membro: Omit<Membro, 'id'>) => Promise<void>
  refresh: () => Promise<void>
}

export const DataContext = createContext<DataState>({} as DataState)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [pastorais, setPastorais] = useState<Pastoral[]>([])
  const [membros, setMembros] = useState<Membro[]>([])
  const [escalas, setEscalas] = useState<Escala[]>([])
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!user) return
    setLoading(true)

    const [
      { data: profilesData },
      { data: pastoraisData },
      { data: cargosData },
      { data: membrosPastoraisData },
      { data: escalasData },
      { data: assignmentsData },
    ] = await Promise.all([
      supabase.from('profiles').select('*'),
      supabase.from('pastorais').select('*'),
      supabase.from('cargos').select('*'),
      supabase.from('membros_pastorais').select('*'),
      supabase.from('escalas').select('*'),
      supabase.from('escala_assignments').select('*'),
    ])

    const mappedPastorais: Pastoral[] = (pastoraisData || []).map((p) => {
      const pCargos = (cargosData || [])
        .filter((c) => c.pastoral_id === p.id)
        .map((c) => ({ id: c.id, name: c.name }))
      const coords = (membrosPastoraisData || [])
        .filter((mp) => mp.pastoral_id === p.id && mp.is_coordenador)
        .map((mp) => mp.membro_id)
      return {
        id: p.id,
        name: p.name,
        description: p.description,
        cargos: pCargos,
        coordenadoresIds: coords,
      }
    })

    const mappedMembros: Membro[] = (profilesData || []).map((prof) => {
      const pIds = (membrosPastoraisData || [])
        .filter((mp) => mp.membro_id === prof.id)
        .map((mp) => mp.pastoral_id)
      return {
        id: prof.id,
        name: prof.name,
        email: prof.email,
        phone: prof.phone,
        status: prof.status,
        role: prof.role,
        pastoralIds: pIds,
      }
    })

    const mappedEscalas: Escala[] = (escalasData || []).map((e) => {
      const assigns = (assignmentsData || [])
        .filter((a) => a.escala_id === e.id)
        .map((a) => ({
          id: a.id,
          cargoId: a.cargo_id,
          membroId: a.membro_id || undefined,
        }))
      return {
        id: e.id,
        pastoralId: e.pastoral_id,
        date: e.date,
        status: e.status as any,
        assignments: assigns,
      }
    })

    setPastorais(mappedPastorais)
    setMembros(mappedMembros)
    setEscalas(mappedEscalas)
    setLoading(false)
  }, [user])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addEscala = async (escala: Omit<Escala, 'id'>) => {
    const { data: newEscala } = await supabase
      .from('escalas')
      .insert({
        pastoral_id: escala.pastoralId,
        date: escala.date,
        status: escala.status,
      })
      .select()
      .single()

    if (newEscala) {
      const inserts = escala.assignments.map((a) => ({
        escala_id: newEscala.id,
        cargo_id: a.cargoId,
        membro_id: a.membroId || null,
      }))
      if (inserts.length > 0) {
        await supabase.from('escala_assignments').insert(inserts)
      }
      await refresh()
    }
  }

  const updateEscala = async (escala: Escala) => {
    await supabase
      .from('escalas')
      .update({
        date: escala.date,
        status: escala.status,
      })
      .eq('id', escala.id)

    await supabase.from('escala_assignments').delete().eq('escala_id', escala.id)
    const inserts = escala.assignments.map((a) => ({
      escala_id: escala.id,
      cargo_id: a.cargoId,
      membro_id: a.membroId || null,
    }))
    if (inserts.length > 0) {
      await supabase.from('escala_assignments').insert(inserts)
    }
    await refresh()
  }

  const addMembro = async (_membro: Omit<Membro, 'id'>) => {
    // Left as stub - member creation requires proper auth hook setup or admin API
  }

  return React.createElement(
    DataContext.Provider,
    {
      value: { pastorais, membros, escalas, loading, addEscala, updateEscala, addMembro, refresh },
    },
    children,
  )
}

export default function useDataStore() {
  return useContext(DataContext)
}
