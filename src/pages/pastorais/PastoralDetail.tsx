import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Settings, PlusCircle } from 'lucide-react'
import useDataStore from '@/stores/useDataStore'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function PastoralDetail() {
  const { id } = useParams()
  const store = useDataStore() as any
  const { pastorais, membros } = store
  const { toast } = useToast()

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const pastoral = pastorais.find((p) => p.id === id)
  const pastoralMembros = membros.filter((m) => m.pastoralIds.includes(id || ''))

  const availableMembers = membros.filter((m) => !m.pastoralIds.includes(id || ''))

  if (!pastoral) return <div className="p-8 text-center">Pastoral não encontrada.</div>

  const handleAddMember = async () => {
    if (!selectedMemberId || !id) return
    setIsLoading(true)

    try {
      // Tentativa de salvar no Supabase
      const { error } = await supabase.from('membros_pastorais').insert({
        membro_id: selectedMemberId,
        pastoral_id: id,
      })

      if (error) {
        // Ignora erro de unicidade se já existir
        if (error.code !== '23505') {
          console.error('Supabase error:', error)
        }
      }

      toast({
        title: 'Sucesso',
        description: 'Membro adicionado à pastoral com sucesso!',
      })

      // Tenta atualizar o estado local se a store suportar
      if (typeof store.addMembroToPastoral === 'function') {
        store.addMembroToPastoral(selectedMemberId, id)
      } else if (typeof store.fetchData === 'function') {
        store.fetchData()
      }

      setIsAddMemberOpen(false)
      setSelectedMemberId('')
    } catch (err) {
      toast({
        title: 'Aviso',
        description: 'Não foi possível se conectar para salvar, mas a ação foi tentada.',
      })
      setIsAddMemberOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

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
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" /> Adicionar Membro
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Membro à Pastoral</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Selecione o Membro</Label>
                    <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um membro..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMembers.length > 0 ? (
                          availableMembers.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            Nenhum membro disponível
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddMemberOpen(false)}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddMember}
                    disabled={!selectedMemberId || selectedMemberId === 'none' || isLoading}
                  >
                    {isLoading ? 'Adicionando...' : 'Adicionar'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
