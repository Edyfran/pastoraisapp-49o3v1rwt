import React, { createContext, useContext, useState } from 'react'
import { Pastoral, Membro, Escala } from '@/types'
import { MOCK_PASTORAIS, MOCK_MEMBROS, MOCK_ESCALAS } from '@/lib/mock-data'

interface DataState {
  pastorais: Pastoral[]
  membros: Membro[]
  escalas: Escala[]
  addEscala: (escala: Escala) => void
  updateEscala: (escala: Escala) => void
  addMembro: (membro: Membro) => void
}

export const DataContext = createContext<DataState>({} as DataState)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [pastorais] = useState<Pastoral[]>(MOCK_PASTORAIS)
  const [membros, setMembros] = useState<Membro[]>(MOCK_MEMBROS)
  const [escalas, setEscalas] = useState<Escala[]>(MOCK_ESCALAS)

  const addEscala = (escala: Escala) => setEscalas((prev) => [...prev, escala])
  const updateEscala = (escala: Escala) =>
    setEscalas((prev) => prev.map((e) => (e.id === escala.id ? escala : e)))
  const addMembro = (membro: Membro) => setMembros((prev) => [...prev, membro])

  return React.createElement(
    DataContext.Provider,
    { value: { pastorais, membros, escalas, addEscala, updateEscala, addMembro } },
    children,
  )
}

export default function useDataStore() {
  return useContext(DataContext)
}
