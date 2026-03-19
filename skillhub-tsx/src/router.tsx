import { lazy, Suspense, type ComponentType } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'

const TableauDeBord   = lazy(() => import('./pages/TableauDeBord'))
const TousLesAteliers = lazy(() => import('./pages/TousLesAteliers'))
const DetailAtelier   = lazy(() => import('./pages/DetailAtelier'))
const MesAteliers     = lazy(() => import('./pages/MesAteliers'))
const EspaceFormateur = lazy(() => import('./pages/EspaceFormateur'))

function PageEnChargement() {
  return (
    <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
      Chargement...
    </div>
  )
}

// TypeScript : ComponentType est le type d'un composant React (fonction ou classe).
// Le générique <Record<string, never>> signifie "pas de props".
const avecSuspense = (Composant: ComponentType<Record<string, never>>) => (
  <Suspense fallback={<PageEnChargement />}>
    <Composant />
  </Suspense>
)

const routeur = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,              element: avecSuspense(TableauDeBord) },
      { path: 'ateliers',         element: avecSuspense(TousLesAteliers) },
      { path: 'ateliers/:id',     element: avecSuspense(DetailAtelier) },
      { path: 'mes-ateliers',     element: avecSuspense(MesAteliers) },
      { path: 'espace-formateur', element: avecSuspense(EspaceFormateur) },
      { path: '*',                element: avecSuspense(TableauDeBord) },
    ]
  }
])

function AppRouter() {
  return <RouterProvider router={routeur} />
}

export default AppRouter
