import { NavLink } from 'react-router-dom'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'

function Navigation() {
  const { utilisateur } = utiliserSkillHub()

  const classeNavLink = ({ isActive }) =>
    'nav-link nav-link-skillhub' + (isActive ? ' actif' : '')

  return (
    <nav className="navbar navbar-expand-lg navbar-skillhub sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand navbar-brand-skillhub">
          <span>🎓</span>
          SkillHub
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-1">
            <li className="nav-item">
              <NavLink to="/" end className={classeNavLink}>
                Tableau de bord
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/ateliers" className={classeNavLink}>
                Tous les ateliers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mes-ateliers" className={classeNavLink}>
                Mes ateliers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/espace-formateur" className={classeNavLink}>
                Espace formateur
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <div className="avatar-cercle">{utilisateur.avatar}</div>
            <span style={{ fontWeight: 600, fontSize: '.9rem' }}>
              {utilisateur.name}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
