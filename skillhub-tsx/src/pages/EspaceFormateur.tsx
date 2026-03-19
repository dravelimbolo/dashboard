import { mockInstructeurAteliers } from '../données/mockData'
import type { StatutAtelier } from '../types'

const couleursStatut: Record<StatutAtelier, string> = {
  upcoming: 'bg-blue-100 text-blue-700',
  ongoing: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-gray-100 text-gray-500',
}

const etiquettesStatut: Record<StatutAtelier, string> = {
  upcoming: 'À venir',
  ongoing: 'En cours',
  completed: 'Terminé',
}

function EspaceFormateur() {
  const ateliersCrees = mockInstructeurAteliers
  const totalParticipants = ateliersCrees.reduce(
    (acc, a) => acc + a.currentParticipants,
    0
  )
  const ateliersTermines = ateliersCrees.filter((a) => a.statut === 'completed').length

  const stats = [
    { titre: 'Ateliers créés', valeur: ateliersCrees.length, couleur: 'text-blue-600' },
    { titre: 'Total participants', valeur: totalParticipants, couleur: 'text-emerald-600' },
    { titre: 'Ateliers terminés', valeur: ateliersTermines, couleur: 'text-gray-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Espace Formateur</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez vos ateliers et suivez vos participants.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.titre} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {stat.titre}
            </p>
            <p className={`text-3xl font-bold ${stat.couleur}`}>{stat.valeur}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800 text-sm">Mes ateliers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Titre
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Participants
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ateliersCrees.map((atelier) => (
                <tr key={atelier.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {atelier.titre}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(atelier.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {atelier.currentParticipants}/{atelier.maxParticipants}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${couleursStatut[atelier.statut]}`}
                    >
                      {etiquettesStatut[atelier.statut]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EspaceFormateur
