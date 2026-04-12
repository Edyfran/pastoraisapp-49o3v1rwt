import { Link } from 'react-router-dom'
import { format, isAfter, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Users, Briefcase, Plus, ChevronRight, Activity } from 'lucide-react'
import useAuthStore from '@/stores/useAuthStore'
import useDataStore from '@/stores/useDataStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function Index() {
  const { user } = useAuthStore()
  const { pastorais, membros, escalas } = useDataStore()

  const nextEscala = escalas
    .filter((e) => isAfter(parseISO(e.date), new Date()))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())[0]

  const relevantPastoral = nextEscala ? pastorais.find((p) => p.id === nextEscala.pastoralId) : null

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Olá, {user?.name.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1 capitalize">
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
        </p>
      </header>

      {/* Next Schedule Card */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Próxima Escala
          </h2>
          <Button variant="link" size="sm" asChild className="text-muted-foreground">
            <Link to="/escalas">
              Ver todas <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
        {nextEscala && relevantPastoral ? (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-sm">
            <CardContent className="p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div>
                <p className="font-semibold text-lg text-primary">{relevantPastoral.name}</p>
                <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {format(parseISO(nextEscala.date), "dd/MM/yyyy 'às' HH:mm")}
                </p>
              </div>
              <Badge
                variant={nextEscala.status === 'CONFIRMADA' ? 'default' : 'secondary'}
                className={
                  nextEscala.status === 'CONFIRMADA'
                    ? 'bg-success hover:bg-success'
                    : 'bg-warning text-warning-foreground'
                }
              >
                {nextEscala.status}
              </Badge>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center text-muted-foreground">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p>Nenhuma escala programada.</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Quick Actions Grid */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Acesso Rápido</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="h-24 flex-col gap-2 shadow-sm" asChild>
            <Link to="/escalas">
              <Calendar className="w-6 h-6 text-primary" /> Ver Escalas
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2 shadow-sm" asChild>
            <Link to="/pastorais">
              <Briefcase className="w-6 h-6 text-accent" /> Pastorais
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2 shadow-sm" asChild>
            <Link to="/membros">
              <Users className="w-6 h-6 text-success" /> Membros
            </Link>
          </Button>
          {(user?.role === 'ADMIN' || user?.role === 'COORDENADOR') && (
            <Button variant="default" className="h-24 flex-col gap-2 shadow-sm" asChild>
              <Link to="/escalas?create=true">
                <Plus className="w-6 h-6" /> Nova Escala
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Summary (Admin/Coordenador) */}
      {user?.role === 'ADMIN' && (
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-muted-foreground" /> Visão Geral
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Membros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{membros.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pastorais Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pastorais.length}</div>
              </CardContent>
            </Card>
            <Card className="col-span-2 md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Escalas do Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{escalas.length}</div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  )
}
