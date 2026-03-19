import { categoriesDisponibles, niveauxDisponibles } from '../données/mockData'

function FiltresAteliers({ filtres, surChangement, surReinit }) {
  return (
    <div className="panneau-filtres">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Filtres</h6>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={surReinit}
        >
          Réinitialiser
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ fontSize: '.85rem' }}>
          Rechercher
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Nom de l'atelier…"
          value={filtres.recherche}
          onChange={e => surChangement('recherche', e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ fontSize: '.85rem' }}>
          Catégorie
        </label>
        <select
          className="form-select form-select-sm"
          value={filtres.categorie}
          onChange={e => surChangement('categorie', e.target.value)}
        >
          <option value="toutes">Toutes les catégories</option>
          {categoriesDisponibles.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-0">
        <label className="form-label fw-semibold" style={{ fontSize: '.85rem' }}>
          Niveau
        </label>
        <select
          className="form-select form-select-sm"
          value={filtres.niveau}
          onChange={e => surChangement('niveau', e.target.value)}
        >
          <option value="tous">Tous les niveaux</option>
          {niveauxDisponibles.map(niv => (
            <option key={niv.valeur} value={niv.valeur}>{niv.libelle}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FiltresAteliers
