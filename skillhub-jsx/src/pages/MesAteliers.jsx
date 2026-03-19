import CarteAtelier from '../composants/CarteAtelier'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'

function SectionAteliers({ titre, ateliers, surInscription, surDesinscription }) {
  return (
    <div className="section-mes-ateliers">
      <h5>
        {titre}{' '}
        <span className="text-muted fw-normal">({ateliers.length})</span>
      </h5>
      {ateliers.length === 0 ? (
        <p className="text-muted" style={{ fontSize: '.9rem' }}>
          Aucun atelier dans cette catégorie.
        </p>
      ) : (
        <div className="row g-3">
          {ateliers.map(atelier => (
            <div key={atelier.id} className="col-sm-6 col-md-4">
              <CarteAtelier
                atelier={atelier}
                surInscription={surInscription}
                surDesinscription={surDesinscription}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MesAteliers() {
  const { utilisateur, ateliers, sInscrire, seDesinscrire } = utiliserSkillHub()

  const mesAteliers = ateliers.filter(a =>
    utilisateur.enrolledWorkshops.includes(a.id)
  )

  const ateliersAVenir = mesAteliers.filter(a => a.status === 'upcoming')
  const ateliersEnCours = mesAteliers.filter(a => a.status === 'ongoing')
  const ateliersTermines = mesAteliers.filter(a => a.status === 'completed')

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Mes Ateliers</h2>

      <SectionAteliers
        titre="Ateliers à venir"
        ateliers={ateliersAVenir}
        surInscription={sInscrire}
        surDesinscription={seDesinscrire}
      />

      <SectionAteliers
        titre="Ateliers en cours"
        ateliers={ateliersEnCours}
        surInscription={sInscrire}
        surDesinscription={seDesinscrire}
      />

      <SectionAteliers
        titre="Ateliers terminés"
        ateliers={ateliersTermines}
        surInscription={sInscrire}
        surDesinscription={seDesinscrire}
      />
    </div>
  )
}

export default MesAteliers
