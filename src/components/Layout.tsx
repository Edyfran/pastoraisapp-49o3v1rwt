import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Home, Calendar, Briefcase, Users, User as UserIcon, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const { user, signOut } = useAuth()
  const location = useLocation()

  const navItems = [
    { title: 'Início', url: '/', icon: Home },
    { title: 'Escalas', url: '/escalas', icon: Calendar },
    { title: 'Pastorais', url: '/pastorais', icon: Briefcase },
    { title: 'Membros', url: '/membros', icon: Users },
    { title: 'Perfil', url: '/perfil', icon: UserIcon },
  ]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 border-b">
          <h2 className="text-xl font-bold text-primary tracking-tight">ECCLESIA-SYNC</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        location.pathname === item.url ||
                        (item.url !== '/' && location.pathname.startsWith(item.url))
                      }
                    >
                      <Link to={item.url}>
                        <item.icon className="w-4 h-4 mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col min-h-screen w-full">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6 shrink-0">
          <SidebarTrigger />
          <div className="flex-1" />
          {user && (
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-muted-foreground hidden sm:inline-block">Olá, {user.name}</span>
            </div>
          )}
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-8 bg-muted/10">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
