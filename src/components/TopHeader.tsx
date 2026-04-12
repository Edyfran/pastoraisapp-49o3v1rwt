import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function TopHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b bg-background/95 backdrop-blur px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <span className="font-semibold text-lg md:hidden">ECCLESIA</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
        </Button>
      </div>
    </header>
  )
}
