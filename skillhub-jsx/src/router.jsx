import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'

// Chaque page est chargée en lazy : le navigateur ne télécharge
// le code d'une page que quand l'utilisateur la visite.
// Ça rend le chargement initial beaucoup plus rapide.
const TableauDeBord   = lazy(() => import('./pages/TableauDeBord'))
const TousLesAteliers = lazy(() => import('./pages/TousLesAteliers'))
const DetailAtelier   = lazy(() => import('./pages/DetailAtelier'))
const MesAteliers     = lazy(() => import('./pages/MesAteliers'))
const EspaceFormateur = lazy(() => import('./pages/EspaceFormateur'))

// Affiché pendant le téléchargement d'une page lazy
function PageEnChargement() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
      Chargement...
    </div>
  )
}

// Helper : enveloppe chaque page dans Suspense sans répétition
const avecSuspense = (Composant) => (
  <Suspense fallback={<PageEnChargement />}>
    <Composant />
  </Suspense>
)

// Définition de toutes les routes de l'application.
// path: '/' → AppLayout (navbar + Outlet) s'affiche toujours.
// children  → les pages s'affichent à la place de <Outlet />.
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
