import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter } from 'lucide-react'
import useDataStore from '@/stores/useDataStore'
import { useAuth } from '@/hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function MembrosList() {
  const { membros, pastorais } = useDataStore()
  const { user } = useAuth()
  const [search, setSearch] = useState('')

  const filteredMembros = membros.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Diretório de Membros</h1>
          <p className="text-muted-foreground">Encontre e gerencie as pessoas da sua igreja.</p>
        </div>
        {(user?.role === 'ADMIN' || user?.role === 'COORDENADOR') && (
          <Button className="shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Novo Membro
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembros.map((membro) => (
          <Link key={membro.id} to={`/membros/${membro.id}`}>
            <Card className="p-4 flex items-center gap-4 hover:border-primary/50 transition-colors">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${membro.id}`} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {membro.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{membro.name}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {membro.pastoralIds.map((pid) => {
                    const past = pastorais.find((p) => p.id === pid)
                    return past ? (
                      <Badge key={pid} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {past.name}
                      </Badge>
                    ) : null
                  })}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredMembros.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum membro encontrado com "{search}".
        </div>
      )}
    </div>
  )
}
