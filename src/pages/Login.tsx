import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/useAuthStore'
import { MOCK_USERS } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'

export default function Login() {
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = (user: (typeof MOCK_USERS)[0]) => {
    login(user)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary animate-slide-in">
        <CardHeader className="text-center pb-8 pt-8">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">ECCLESIA-SYNC</CardTitle>
          <CardDescription className="text-base">
            Selecione um perfil para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {MOCK_USERS.map((user) => (
            <Button
              key={user.id}
              variant="outline"
              className="w-full h-auto py-4 flex flex-col items-start gap-1 justify-start border-2 hover:border-primary hover:bg-primary/5 transition-all"
              onClick={() => handleLogin(user)}
            >
              <span className="font-semibold text-base">{user.name}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {user.role}
              </span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
