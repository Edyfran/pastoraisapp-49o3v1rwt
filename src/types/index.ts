export type Role = 'ADMIN' | 'COORDENADOR' | 'MEMBRO'

export interface User {
  id: string
  name: string
  role: Role
  email: string
  avatar?: string
  pastoralIds: string[]
}

export interface Cargo {
  id: string
  name: string
}

export interface Pastoral {
  id: string
  name: string
  description: string
  cargos: Cargo[]
  coordenadoresIds: string[]
}

export interface Membro {
  id: string
  name: string
  phone: string
  email: string
  pastoralIds: string[]
  status: 'ATIVO' | 'INATIVO'
  avatar?: string
}

export interface EscalaAssignment {
  cargoId: string
  membroId?: string
}

export interface Escala {
  id: string
  date: string // ISO String
  pastoralId: string
  assignments: EscalaAssignment[]
  status: 'PENDENTE' | 'CONFIRMADA'
}
