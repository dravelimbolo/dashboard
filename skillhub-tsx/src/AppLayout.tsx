import { Outlet } from 'react-router-dom'
import Navigation from './composants/Navigation'

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
