import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, PlusCircle, Trash2, Shield, User } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const MemberCard = ({
  membro,
  onRemove,
  isCoordenador,
}: {
  membro: any
  onRemove: (id: string) => void
  isCoordenador?: boolean
}) => (
  <Card className="p-4 group relative overflow-hidden transition-all hover:shadow-md bg-card">
    <div className="flex items-center gap-3">
      <Avatar className={cn('h-10 w-10', isCoordenador ? 'ring-2 ring-primary ring-offset-2' : '')}>
        <AvatarFallback
          className={cn(
            'font-medium',
            isCoordenador ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground',
          )}
        >
          {membro.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate flex items-center gap-2">
          {membro.name}
          {isCoordenador && <Shield className="w-3 h-3 text-primary" />}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {membro.email || membro.phone || 'Sem contato'}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
        onClick={() => onRemove(membro.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  </Card>
)

export default function PastoralDetail() {
  const { id } = useParams()
  const store = useDataStore()
  // @ts-expect-error - store types might be incomplete
  const { pastorais, membros, refresh } = store
  const { toast } = useToast()

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState<string>('')
  const [isCoordenador, setIsCoordenador] = useState(false)
  const [selectedCargos, setSelectedCargos] = useState<string[]>([])

  const [isAddCargoOpen, setIsAddCargoOpen] = useState(false)
  const [newCargoName, setNewCargoName] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [membroCargos, setMembroCargos] = useState<Record<string, string[]>>({})

  const loadMembroCargos = async () => {
    if (!id) return
    const { data, error } = await supabase
      .from('membro_cargos' as any)
      .select('membro_id, cargo_id')
      .eq('pastoral_id', id)

    if (data && !error) {
      const map: Record<string, string[]> = {}
      data.forEach((row: any) => {
        if (!map[row.membro_id]) map[row.membro_id] = []
        map[row.membro_id].push(row.cargo_id)
      })
      setMembroCargos(map)
    }
  }

  useEffect(() => {
    loadMembroCargos()
  }, [id])

  const pastoral = pastorais.find((p: any) => p.id === id)
  const pastoralMembros = membros.filter((m: any) => m.pastoralIds?.includes(id || ''))
  const availableMembers = membros.filter((m: any) => !m.pastoralIds?.includes(id || ''))

  if (!pastoral)
    return <div className="p-8 text-center animate-fade-in">Pastoral não encontrada.</div>

  const coordenadores = pastoralMembros.filter((m: any) =>
    pastoral.coordenadoresIds?.includes(m.id),
  )
  const membrosNormais = pastoralMembros.filter(
    (m: any) => !pastoral.coordenadoresIds?.includes(m.id),
  )

  const membrosPorCargo =
    pastoral.cargos?.map((cargo: any) => ({
      ...cargo,
      members: membrosNormais.filter((m: any) => (membroCargos[m.id] || []).includes(cargo.id)),
    })) || []

  const membrosSemCargo = membrosNormais.filter((m: any) => (membroCargos[m.id] || []).length === 0)

  const handleAddMember = async () => {
    if (!selectedMemberId || !id) return
    setIsLoading(true)

    try {
      const { error } = await supabase.from('membros_pastorais').insert({
        membro_id: selectedMemberId,
        pastoral_id: id,
        is_coordenador: isCoordenador,
      })

      if (error && error.code !== '23505') throw error

      if (selectedCargos.length > 0) {
        const cargoInserts = selectedCargos.map((cargoId) => ({
          membro_id: selectedMemberId,
          cargo_id: cargoId,
          pastoral_id: id,
        }))
        await supabase.from('membro_cargos' as any).insert(cargoInserts)
      }

      toast({ title: 'Sucesso', description: 'Pessoa adicionada com sucesso!' })

      if (typeof refresh === 'function') await refresh()
      await loadMembroCargos()

      setIsAddMemberOpen(false)
      setSelectedMemberId('')
      setIsCoordenador(false)
      setSelectedCargos([])
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar a pessoa.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('membros_pastorais')
        .delete()
        .match({ membro_id: memberId, pastoral_id: id })

      if (error) throw error

      await supabase
        .from('membro_cargos' as any)
        .delete()
        .match({ membro_id: memberId, pastoral_id: id })

      toast({ title: 'Sucesso', description: 'Pessoa removida da pastoral.' })
      if (typeof refresh === 'function') await refresh()
      loadMembroCargos()
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao remover pessoa.', variant: 'destructive' })
    }
  }

  const handleAddCargo = async () => {
    if (!newCargoName.trim() || !id) return
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('cargos')
        .insert({ pastoral_id: id, name: newCargoName.trim() })
      if (error) throw error
      toast({ title: 'Sucesso', description: 'Cargo criado com sucesso!' })
      if (typeof refresh === 'function') await refresh()
      setIsAddCargoOpen(false)
      setNewCargoName('')
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o cargo.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveCargo = async (cargoId: string) => {
    try {
      const { error } = await supabase.from('cargos').delete().match({ id: cargoId })
      if (error) throw error
      toast({ title: 'Sucesso', description: 'Cargo removido com sucesso.' })
      if (typeof refresh === 'function') await refresh()
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao remover cargo.', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/pastorais">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{pastoral.name}</h1>
            <p className="text-muted-foreground text-sm">
              {pastoral.description || 'Gestão da pastoral e equipe'}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="membros" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="membros">Equipe ({pastoralMembros.length})</TabsTrigger>
          <TabsTrigger value="cargos">Cargos ({pastoral.cargos?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="membros" className="mt-6 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Membros da Pastoral</h2>
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Adicionar</span> Pessoa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Vincular Pessoa à Pastoral</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Selecione a pessoa</Label>
                    <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Busque por um membro..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMembers.length > 0 ? (
                          availableMembers.map((m: any) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            Todos os membros já estão nesta pastoral
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">É Coordenador?</Label>
                      <p className="text-sm text-muted-foreground">
                        Esta pessoa terá permissões de gerenciar a pastoral.
                      </p>
                    </div>
                    <Switch checked={isCoordenador} onCheckedChange={setIsCoordenador} />
                  </div>

                  {pastoral.cargos && pastoral.cargos.length > 0 && (
                    <div className="space-y-3 pt-2 border-t">
                      <Label className="text-base">Funções / Cargos (Opcional)</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {pastoral.cargos.map((cargo: any) => (
                          <div key={cargo.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cargo-${cargo.id}`}
                              checked={selectedCargos.includes(cargo.id)}
                              onCheckedChange={(checked) => {
                                if (checked) setSelectedCargos([...selectedCargos, cargo.id])
                                else setSelectedCargos(selectedCargos.filter((c) => c !== cargo.id))
                              }}
                            />
                            <label
                              htmlFor={`cargo-${cargo.id}`}
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              {cargo.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Coordenadores ({coordenadores.length})
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {coordenadores.map((m: any) => (
                  <MemberCard key={m.id} membro={m} onRemove={handleRemoveMember} isCoordenador />
                ))}
                {coordenadores.length === 0 && (
                  <div className="col-span-full py-6 text-center border border-dashed rounded-lg text-sm text-muted-foreground">
                    Nenhum coordenador definido.
                  </div>
                )}
              </div>
            </div>

            {membrosPorCargo.map(
              (cargo: any) =>
                cargo.members.length > 0 && (
                  <div key={cargo.id}>
                    <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {cargo.name} ({cargo.members.length})
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {cargo.members.map((m: any) => (
                        <MemberCard key={m.id} membro={m} onRemove={handleRemoveMember} />
                      ))}
                    </div>
                  </div>
                ),
            )}

            {membrosSemCargo.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Membros sem função específica ({membrosSemCargo.length})
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {membrosSemCargo.map((m: any) => (
                    <MemberCard key={m.id} membro={m} onRemove={handleRemoveMember} />
                  ))}
                </div>
              </div>
            )}

            {pastoralMembros.length === 0 && (
              <div className="py-12 text-center border border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Esta pastoral ainda não possui membros.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="cargos" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Cargos da Pastoral</h2>
              <p className="text-sm text-muted-foreground">
                Ex: Leitores, Salmistas, Ministros, etc.
              </p>
            </div>
            <Dialog open={isAddCargoOpen} onOpenChange={setIsAddCargoOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" /> Novo Cargo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Cargo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cargoName">Nome do Cargo</Label>
                    <Input
                      id="cargoName"
                      placeholder="Ex: Leitor"
                      value={newCargoName}
                      onChange={(e) => setNewCargoName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddCargoOpen(false)}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddCargo} disabled={!newCargoName.trim() || isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pastoral.cargos?.map((cargo: any) => (
              <Card
                key={cargo.id}
                className="p-4 flex justify-between items-center group bg-card hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                    {cargo.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="font-medium text-sm">{cargo.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => handleRemoveCargo(cargo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
            ))}

            {(!pastoral.cargos || pastoral.cargos.length === 0) && (
              <div className="col-span-full py-12 text-center border border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Nenhum cargo cadastrado nesta pastoral.
                </p>
                <Button variant="link" onClick={() => setIsAddCargoOpen(true)}>
                  Criar primeiro cargo
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
