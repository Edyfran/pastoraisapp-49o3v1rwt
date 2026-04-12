import { useState } from 'react'
import { formatISO } from 'date-fns'
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react'
import useDataStore from '@/stores/useDataStore'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function EscalaCreatorDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const { pastorais, membros, addEscala } = useDataStore()
  const { toast } = useToast()

  const [pastoralId, setPastoralId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedPastoral = pastorais.find((p) => p.id === pastoralId)

  const handleSave = () => {
    if (!pastoralId || !date) return
    setIsSubmitting(true)

    // Simulate network delay
    setTimeout(() => {
      const dateTimeString = `${date}T${time}:00`

      const newEscala = {
        id: `e-${Date.now()}`,
        date: formatISO(new Date(dateTimeString)),
        pastoralId,
        status: 'PENDENTE' as const,
        assignments: selectedPastoral?.cargos.map((c) => ({ cargoId: c.id })) || [], // Init empty assignments
      }

      addEscala(newEscala)
      setIsSubmitting(false)
      onOpenChange(false)

      toast({
        title: 'Escala criada com sucesso!',
        description: 'Agora você pode atribuir os membros aos cargos.',
      })

      // Reset form
      setPastoralId('')
      setDate('')
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Escala</DialogTitle>
          <DialogDescription>Crie uma escala selecionando a pastoral e a data.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="pastoral">Pastoral</Label>
            <Select value={pastoralId} onValueChange={setPastoralId}>
              <SelectTrigger id="pastoral">
                <SelectValue placeholder="Selecione a pastoral" />
              </SelectTrigger>
              <SelectContent>
                {pastorais.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Data</Label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Horário</Label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!pastoralId || !date || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CalendarIcon className="mr-2 h-4 w-4" />
            )}
            Gerar Escala
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
