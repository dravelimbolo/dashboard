import { Outlet } from 'react-router-dom'
import Navigation from './composants/Navigation'

// AppLayout est le layout partagé.
// Il s'affiche sur TOUTES les pages.
// <Outlet /> est l'emplacement où la page active sera insérée
// par le router. Navigation reste toujours visible.
function AppLayout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
