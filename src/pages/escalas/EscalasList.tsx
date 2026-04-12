import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon, Plus, Share2, MoreVertical, AlertCircle } from 'lucide-react'
import useDataStore from '@/stores/useDataStore'
import useAuthStore from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EscalaCreatorDialog from './EscalaCreatorDialog'
import { Calendar } from '@/components/ui/calendar'

export default function EscalasList() {
  const { escalas, pastorais, membros } = useDataStore()
  const { user } = useAuthStore()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [creatorOpen, setCreatorOpen] = useState(false)

  // Sort scales chronologically
  const sortedEscalas = [...escalas].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime(),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Escalas de Serviço</h1>
          <p className="text-muted-foreground">Organize e visualize as atividades do mês.</p>
        </div>
        {(user?.role === 'ADMIN' || user?.role === 'COORDENADOR') && (
          <Button onClick={() => setCreatorOpen(true)} className="shrink-0 shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Criar Escala
          </Button>
        )}
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-6">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-4">
          {sortedEscalas.map((escala) => {
            const pastoral = pastorais.find((p) => p.id === escala.pastoralId)
            const isMissingMembers = escala.assignments.some((a) => !a.membroId)

            return (
              <Card
                key={escala.id}
                className="overflow-hidden shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Date Badge Side */}
                  <div className="bg-secondary/50 p-4 flex sm:flex-col items-center justify-center sm:w-28 border-b sm:border-b-0 sm:border-r gap-2 sm:gap-0">
                    <span className="text-sm font-semibold uppercase text-muted-foreground">
                      {format(parseISO(escala.date), 'MMM', { locale: ptBR })}
                    </span>
                    <span className="text-3xl font-bold text-primary leading-none">
                      {format(parseISO(escala.date), 'dd')}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground mt-1">
                      {format(parseISO(escala.date), 'EEEE', { locale: ptBR })}
                    </span>
                  </div>

                  {/* Content Side */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{pastoral?.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <CalendarIcon className="w-3 h-3 mr-1" />{' '}
                          {format(parseISO(escala.date), 'HH:mm')}h
                        </p>
                      </div>
                      <Badge
                        variant={escala.status === 'CONFIRMADA' ? 'default' : 'outline'}
                        className={
                          escala.status === 'CONFIRMADA'
                            ? 'bg-success hover:bg-success'
                            : 'text-warning border-warning'
                        }
                      >
                        {escala.status}
                      </Badge>
                    </div>

                    <div className="mt-4 pt-4 border-t space-y-2">
                      {escala.assignments.map((assignment, idx) => {
                        const cargo = pastoral?.cargos.find((c) => c.id === assignment.cargoId)
                        const membro = membros.find((m) => m.id === assignment.membroId)
                        return (
                          <div key={idx} className="flex justify-between text-sm items-center">
                            <span className="text-muted-foreground w-1/3 truncate">
                              {cargo?.name}
                            </span>
                            {membro ? (
                              <span className="font-medium text-right truncate">{membro.name}</span>
                            ) : (
                              <span className="text-warning flex items-center gap-1 text-xs">
                                <AlertCircle className="w-3 h-3" /> Pendente
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-muted/30 p-2 sm:w-12 flex flex-row sm:flex-col items-center justify-center gap-2 border-t sm:border-t-0 sm:border-l">
                    <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
          {sortedEscalas.length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card border rounded-lg border-dashed">
              Nenhuma escala cadastrada.
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendario">
          <Card className="p-4 md:p-6 flex justify-center bg-card">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm w-full max-w-md mx-auto"
            />
          </Card>
        </TabsContent>
      </Tabs>

      <EscalaCreatorDialog open={creatorOpen} onOpenChange={setCreatorOpen} />
    </div>
  )
}
