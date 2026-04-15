import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

// Providers
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { DataProvider } from '@/stores/useDataStore'

// Components
import Layout from './components/Layout'
import NotFound from './pages/NotFound'

// Pages
import Login from './pages/Login'
import Index from './pages/Index'
import PastoraisList from './pages/pastorais/PastoraisList'
import PastoralDetail from './pages/pastorais/PastoralDetail'
import MembrosList from './pages/membros/MembrosList'
import MembroDetail from './pages/membros/MembroDetail'
import EscalasList from './pages/escalas/EscalasList'
import Perfil from './pages/Perfil'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Index />} />
              <Route path="/pastorais" element={<PastoraisList />} />
              <Route path="/pastorais/:id" element={<PastoralDetail />} />
              <Route path="/membros" element={<MembrosList />} />
              <Route path="/membros/:id" element={<MembroDetail />} />
              <Route path="/escalas" element={<EscalasList />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
