import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Settings, ShieldAlert, BellRing } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Perfil() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight">Meu Perfil</h1>

      <Card className="border-t-4 border-t-primary shadow-sm">
        <CardContent className="pt-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="h-24 w-24 ring-4 ring-secondary">
            <AvatarImage src={`https://img.usecurling.com/ppl/medium?seed=${user.id}`} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground mt-1">{user.email}</p>
            <div className="inline-flex items-center mt-3 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {user.role}
            </div>
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            Editar Perfil
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5" /> Configurações de Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Notificações Push</p>
                <p className="text-xs text-muted-foreground">Receba alertas sobre suas escalas.</p>
              </div>
              <Button variant="secondary" size="sm">
                Configurar
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Alterar Senha</p>
                <p className="text-xs text-muted-foreground">Atualize sua senha de acesso.</p>
              </div>
              <Button variant="secondary" size="sm">
                Alterar
              </Button>
            </div>
          </CardContent>
        </Card>

        {user.role === 'ADMIN' && (
          <Card className="shadow-sm border-destructive/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-destructive flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Área Administrativa
              </CardTitle>
              <CardDescription>Configurações globais do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal border-dashed"
              >
                Auditoria de Ações
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal border-dashed"
              >
                Exportar Banco de Dados
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Button variant="destructive" className="w-full mt-8" onClick={signOut}>
        <LogOut className="w-4 h-4 mr-2" /> Sair do Sistema
      </Button>
    </div>
  )
}
