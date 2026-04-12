import { User, Pastoral, Membro, Escala } from '@/types'
import { addDays, setHours, setMinutes, formatISO } from 'date-fns'

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Padre João', role: 'ADMIN', email: 'joao@igreja.com', pastoralIds: [] },
  {
    id: 'u2',
    name: 'Maria Silva',
    role: 'COORDENADOR',
    email: 'maria@igreja.com',
    pastoralIds: ['p1'],
  },
  {
    id: 'u3',
    name: 'Carlos Santos',
    role: 'MEMBRO',
    email: 'carlos@igreja.com',
    pastoralIds: ['p1', 'p2'],
  },
]

export const MOCK_PASTORAIS: Pastoral[] = [
  {
    id: 'p1',
    name: 'Liturgia',
    description: 'Equipe responsável pelas leituras e organização da missa.',
    cargos: [
      { id: 'c1', name: 'Comentarista' },
      { id: 'c2', name: 'Leitor 1' },
      { id: 'c3', name: 'Leitor 2' },
    ],
    coordenadoresIds: ['u2'],
  },
  {
    id: 'p2',
    name: 'Música',
    description: 'Ministério de louvor e adoração.',
    cargos: [
      { id: 'c4', name: 'Vocal' },
      { id: 'c5', name: 'Violão' },
      { id: 'c6', name: 'Teclado' },
    ],
    coordenadoresIds: [],
  },
]

export const MOCK_MEMBROS: Membro[] = [
  {
    id: 'm1',
    name: 'Carlos Santos',
    phone: '11999999999',
    email: 'carlos@igreja.com',
    pastoralIds: ['p1', 'p2'],
    status: 'ATIVO',
  },
  {
    id: 'm2',
    name: 'Ana Oliveira',
    phone: '11988888888',
    email: 'ana@igreja.com',
    pastoralIds: ['p1'],
    status: 'ATIVO',
  },
  {
    id: 'm3',
    name: 'Pedro Costa',
    phone: '11977777777',
    email: 'pedro@igreja.com',
    pastoralIds: ['p2'],
    status: 'INATIVO',
  },
]

const nextSunday = setMinutes(setHours(addDays(new Date(), 7 - new Date().getDay()), 10), 0)

export const MOCK_ESCALAS: Escala[] = [
  {
    id: 'e1',
    date: formatISO(nextSunday),
    pastoralId: 'p1',
    status: 'CONFIRMADA',
    assignments: [
      { cargoId: 'c1', membroId: 'm2' },
      { cargoId: 'c2', membroId: 'm1' },
      { cargoId: 'c3' }, // empty slot
    ],
  },
]
