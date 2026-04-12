import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, Users, Briefcase, User as UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const { pathname } = useLocation()

  const navItems = [
    { title: 'Início', url: '/', icon: Home },
    { title: 'Escalas', url: '/escalas', icon: Calendar },
    { title: 'Pastorais', url: '/pastorais', icon: Briefcase },
    { title: 'Membros', url: '/membros', icon: Users },
    { title: 'Perfil', url: '/perfil', icon: UserIcon },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.url
          return (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'fill-primary/20')} />
              <span className="text-[10px] font-medium">{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
