import type { Atelier, StatutAtelier } from '../types'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'
import CarteAtelier from '../composants/CarteAtelier'

interface PropsSectionAteliers {
  titre: string
  ateliers: Atelier[]
  couleurTitre: string
}

function SectionAteliers({ titre, ateliers, couleurTitre }: PropsSectionAteliers) {
  return (
    <section className="mb-10">
      <h2 className={`text-base font-semibold mb-4 ${couleurTitre}`}>{titre}</h2>
      {ateliers.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Aucun atelier dans cette section.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {ateliers.map((atelier) => (
            <CarteAtelier key={atelier.id} atelier={atelier} />
          ))}
        </div>
      )}
    </section>
  )
}

function MesAteliers() {
  const { ateliers, utilisateur } = utiliserSkillHub()

  const ateliersInscrits = ateliers.filter((a) =>
    utilisateur.ateliersInscrits.includes(a.id)
  )

  const filtrerParStatut = (statut: StatutAtelier) =>
    ateliersInscrits.filter((a) => a.statut === statut)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes Ateliers</h1>
        <p className="text-sm text-gray-500 mt-1">
          {ateliersInscrits.length} atelier(s) au total
        </p>
      </div>
      <SectionAteliers
        titre="A venir"
        ateliers={filtrerParStatut('upcoming')}
        couleurTitre="text-blue-700"
      />
      <SectionAteliers
        titre="En cours"
        ateliers={filtrerParStatut('ongoing')}
        couleurTitre="text-emerald-700"
      />
      <SectionAteliers
        titre="Terminés"
        ateliers={filtrerParStatut('completed')}
        couleurTitre="text-gray-500"
      />
    </div>
  )
}

export default MesAteliers
