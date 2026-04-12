import { Outlet, Navigate } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { BottomNav } from './BottomNav'
import { TopHeader } from './TopHeader'
import useAuthStore from '@/stores/useAuthStore'

export default function Layout() {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-secondary/30">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden">
          <TopHeader />
          <main className="flex-1 w-full p-4 md:p-6 pb-24 md:pb-6 overflow-y-auto animate-fade-in">
            <div className="mx-auto max-w-5xl w-full h-full">
              <Outlet />
            </div>
          </main>
          <BottomNav />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
