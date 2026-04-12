import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react'
import useDataStore from '@/stores/useDataStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function MembroDetail() {
  const { id } = useParams()
  const { membros, pastorais, escalas } = useDataStore()

  const membro = membros.find((m) => m.id === id)
  if (!membro) return <div className="p-8 text-center">Membro não encontrado.</div>

  const userPastorais = pastorais.filter((p) => membro.pastoralIds.includes(p.id))

  // Find upcoming schedules for this member
  const upcomingEscalas = escalas
    .filter(
      (e) => e.assignments.some((a) => a.membroId === membro.id) && new Date(e.date) >= new Date(),
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/membros">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Perfil do Membro</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border-t-4 border-t-primary shadow-sm h-fit">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 ring-4 ring-secondary">
              <AvatarImage src={`https://img.usecurling.com/ppl/medium?seed=${membro.id}`} />
              <AvatarFallback className="text-2xl">
                {membro.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{membro.name}</h2>
            <Badge
              variant={membro.status === 'ATIVO' ? 'default' : 'secondary'}
              className="mt-2 mb-4"
            >
              {membro.status}
            </Badge>

            <div className="w-full space-y-3 mt-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground bg-secondary/50 p-2 rounded-md">
                <Phone className="w-4 h-4" />
                <span className="flex-1 text-left">{membro.phone || 'Não informado'}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground bg-secondary/50 p-2 rounded-md">
                <Mail className="w-4 h-4" />
                <span className="flex-1 text-left truncate">{membro.email || 'Não informado'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Pastorais Vinculadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userPastorais.map((p) => (
                  <Badge
                    key={p.id}
                    variant="secondary"
                    className="px-3 py-1 text-sm bg-accent/10 text-accent hover:bg-accent/20"
                  >
                    {p.name}
                  </Badge>
                ))}
                {userPastorais.length === 0 && (
                  <span className="text-muted-foreground text-sm">Nenhuma pastoral vinculada.</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Próximas Escalas</CardTitle>
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEscalas.map((escala) => {
                const past = pastorais.find((p) => p.id === escala.pastoralId)
                const assignment = escala.assignments.find((a) => a.membroId === membro.id)
                const cargo = past?.cargos.find((c) => c.id === assignment?.cargoId)

                return (
                  <div
                    key={escala.id}
                    className="flex gap-4 items-start border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="bg-primary/10 rounded-lg p-3 flex flex-col items-center justify-center min-w-[60px]">
                      <span className="text-xs font-semibold text-primary uppercase">
                        {new Date(escala.date).toLocaleString('pt-BR', { month: 'short' })}
                      </span>
                      <span className="text-lg font-bold text-primary leading-none">
                        {new Date(escala.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{past?.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3 text-success" />
                        Função:{' '}
                        <span className="font-medium text-foreground">
                          {cargo?.name || 'Membro'}
                        </span>
                      </p>
                    </div>
                  </div>
                )
              })}
              {upcomingEscalas.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma escala prevista.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
