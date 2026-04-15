import { Link } from 'react-router-dom'
import { Briefcase, Users, ChevronRight, Plus } from 'lucide-react'
import useDataStore from '@/stores/useDataStore'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function PastoraisList() {
  const { pastorais, membros } = useDataStore()
  const { user } = useAuth()
  const [search, setSearch] = useState('')

  const filteredPastorais = pastorais.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pastorais e Movimentos</h1>
          <p className="text-muted-foreground">Gerencie as equipes e seus respectivos cargos.</p>
        </div>
        {user?.role === 'ADMIN' && (
          <Button className="shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Nova Pastoral
          </Button>
        )}
      </div>

      <Input
        placeholder="Buscar pastoral..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md bg-card"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPastorais.map((pastoral) => {
          const totalMembros = membros.filter((m) => m.pastoralIds.includes(pastoral.id)).length
          const isCoordenador = pastoral.coordenadoresIds.includes(user?.id || '')

          return (
            <Link key={pastoral.id} to={`/pastorais/${pastoral.id}`}>
              <Card className="hover:border-primary/50 transition-colors h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Briefcase className="w-5 h-5 text-accent" />
                    </div>
                    {isCoordenador && (
                      <Badge variant="secondary" className="text-[10px]">
                        Minha Pastoral
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-3 text-lg">{pastoral.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{pastoral.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0 flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1.5" />
                    {totalMembros} membros
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {filteredPastorais.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">Nenhuma pastoral encontrada.</div>
      )}
    </div>
  )
}
