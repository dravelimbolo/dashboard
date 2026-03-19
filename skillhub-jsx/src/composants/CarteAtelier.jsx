import { useNavigate } from 'react-router-dom'

function BadgeStatut({ statut }) {
  const classesBadge = {
    upcoming: 'badge-statut badge-upcoming',
    ongoing: 'badge-statut badge-ongoing',
    completed: 'badge-statut badge-completed',
  }
  return (
    <span className={classesBadge[statut] || 'badge-statut badge-upcoming'}>
      {statut}
    </span>
  )
}

function BarreProgression({ actuel, max }) {
  const pourcentage = Math.round((actuel / max) * 100)
  return (
    <>
      <div className="barre-progression-conteneur">
        <div
          className="barre-progression-remplissage"
          style={{ width: `${pourcentage}%` }}
        />
      </div>
      <p className="compteur-participants">{actuel}/{max}</p>
    </>
  )
}

function CarteAtelier({ atelier, surInscription, surDesinscription }) {
  const naviguer = useNavigate()
  const estComplet = atelier.currentParticipants >= atelier.maxParticipants

  const gererInscription = () => {
    if (atelier.isEnrolled) {
      surDesinscription(atelier.id)
    } else if (!estComplet) {
      surInscription(atelier.id)
    }
  }

  return (
    <div className="carte-atelier h-100 d-flex flex-column">
      <div className={`carte-image ${atelier.couleurImage}`}>
        {atelier.nomImage}
        <BadgeStatut statut={atelier.status} />
      </div>

      <div className="carte-corps d-flex flex-column flex-grow-1">
        <h6 className="carte-titre">{atelier.title}</h6>
        <p className="carte-description">{atelier.description}</p>

        <div className="carte-meta">
          <div>Instructeur : {atelier.instructor.name}</div>
          <div>Date : {atelier.date}</div>
          <div>Durée : {atelier.duration}min</div>
        </div>

        <BarreProgression actuel={atelier.currentParticipants} max={atelier.maxParticipants} />

        <div className="tags-conteneur">
          {atelier.tags.map(tag => (
            <span key={tag} className="tag-atelier">{tag}</span>
          ))}
        </div>

        <div className="d-flex gap-2 mt-auto">
          <button
            className="btn btn-outline-secondary btn-sm flex-grow-1"
            onClick={() => naviguer(`/ateliers/${atelier.id}`)}
          >
            Détails
          </button>
          <button
            className={`btn btn-sm flex-grow-1 ${
              atelier.isEnrolled
                ? 'bouton-inscrit'
                : estComplet
                  ? 'btn-secondary disabled'
                  : 'btn-primary'
            }`}
            onClick={gererInscription}
            disabled={estComplet && !atelier.isEnrolled}
          >
            {atelier.isEnrolled ? '✓ Inscrit' : estComplet ? 'Complet' : "S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarteAtelier
