import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Settings, PlusCircle } from 'lucide-react'
import useDataStore from '@/stores/useDataStore'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function PastoralDetail() {
  const { id } = useParams()
  const { pastorais, membros } = useDataStore()

  const pastoral = pastorais.find((p) => p.id === id)
  const pastoralMembros = membros.filter((m) => m.pastoralIds.includes(id || ''))

  if (!pastoral) return <div className="p-8 text-center">Pastoral não encontrada.</div>

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/pastorais">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{pastoral.name}</h1>
          <p className="text-muted-foreground text-sm">Detalhes e gestão da pastoral</p>
        </div>
      </div>

      <Tabs defaultValue="membros" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="membros">Membros ({pastoralMembros.length})</TabsTrigger>
          <TabsTrigger value="cargos">Cargos ({pastoral.cargos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="membros" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button size="sm">
              <PlusCircle className="w-4 h-4 mr-2" /> Adicionar Membro
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pastoralMembros.map((membro) => {
              const isCoord = pastoral.coordenadoresIds.includes(membro.id)
              return (
                <Card key={membro.id} className="p-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {membro.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{membro.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{membro.phone}</p>
                  </div>
                  {isCoord && (
                    <Badge variant="default" className="text-[10px] bg-accent hover:bg-accent">
                      Coordenador
                    </Badge>
                  )}
                </Card>
              )
            })}
            {pastoralMembros.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 col-span-2 text-center">
                Nenhum membro cadastrado.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="cargos" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button size="sm" variant="secondary">
              <Settings className="w-4 h-4 mr-2" /> Gerenciar Cargos
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pastoral.cargos.map((cargo) => (
              <Card
                key={cargo.id}
                className="p-4 flex justify-between items-center bg-card shadow-sm"
              >
                <span className="font-medium text-sm">{cargo.name}</span>
                <Badge variant="outline">Ativo</Badge>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
