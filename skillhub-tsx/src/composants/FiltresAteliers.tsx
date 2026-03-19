import type { Filtres } from '../types'
import { categoriesDisponibles, niveauxDisponibles } from '../données/mockData'

interface PropsFiltresAteliers {
  filtres: Filtres
  surChangement: (cle: keyof Filtres, valeur: string) => void
  surReinit: () => void
}

function FiltresAteliers({ filtres, surChangement, surReinit }: PropsFiltresAteliers) {
  const aFiltresActifs =
    filtres.recherche !== '' || filtres.categorie !== '' || filtres.niveau !== ''

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 text-sm">Filtres</h2>
        {aFiltresActifs && (
          <button
            onClick={surReinit}
            className="text-xs text-blue-600 hover:underline"
          >
            Réinitialiser
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Recherche
          </label>
          <input
            type="text"
            value={filtres.recherche}
            onChange={(e) => surChangement('recherche', e.target.value)}
            placeholder="Titre, tag..."
            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Catégorie
          </label>
          <select
            value={filtres.categorie}
            onChange={(e) => surChangement('categorie', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Toutes</option>
            {categoriesDisponibles.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Niveau
          </label>
          <select
            value={filtres.niveau}
            onChange={(e) => surChangement('niveau', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Tous</option>
            {niveauxDisponibles.map((n) => (
              <option key={n.valeur} value={n.valeur}>
                {n.etiquette}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default FiltresAteliers
