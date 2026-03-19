import { NavLink } from 'react-router-dom'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'

function Navigation() {
  const { utilisateur } = utiliserSkillHub()

  const classeNavLink = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <span className="text-white text-xl font-bold tracking-tight">
              Skill<span className="text-blue-400">Hub</span>
            </span>
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" end className={classeNavLink}>
                Accueil
              </NavLink>
              <NavLink to="/ateliers" className={classeNavLink}>
                Ateliers
              </NavLink>
              <NavLink to="/mes-ateliers" className={classeNavLink}>
                Mes Ateliers
              </NavLink>
              <NavLink to="/espace-formateur" className={classeNavLink}>
                Formateur
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {utilisateur.avatar}
            </div>
            <span className="text-gray-300 text-sm hidden sm:block">{utilisateur.nom}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
