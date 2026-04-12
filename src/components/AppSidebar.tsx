import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, Users, Briefcase, User as UserIcon, Settings, Shield } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import useAuthStore from '@/stores/useAuthStore'

export function AppSidebar() {
  const { pathname } = useLocation()
  const { user } = useAuthStore()

  const navItems = [
    { title: 'Início', url: '/', icon: Home },
    { title: 'Escalas', url: '/escalas', icon: Calendar },
    { title: 'Pastorais', url: '/pastorais', icon: Briefcase },
    { title: 'Membros', url: '/membros', icon: Users },
    { title: 'Perfil', url: '/perfil', icon: UserIcon },
  ]

  return (
    <Sidebar className="hidden md:flex border-r bg-card">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2">
        <div className="bg-primary rounded-md p-1.5">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg text-primary tracking-tight">ECCLESIA</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
