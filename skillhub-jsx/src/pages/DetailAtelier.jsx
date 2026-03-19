import { useParams, useNavigate } from 'react-router-dom'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'

function DetailAtelier() {
  const { id } = useParams()
  const naviguer = useNavigate()
  const { ateliers, sInscrire, seDesinscrire } = utiliserSkillHub()

  const atelier = ateliers.find(a => a.id === id)

  if (!atelier) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Atelier introuvable.</div>
        <button className="btn btn-secondary" onClick={() => naviguer(-1)}>
          ← Retour
        </button>
      </div>
    )
  }

  const pourcentage = Math.round(
    (atelier.currentParticipants / atelier.maxParticipants) * 100
  )
  const estComplet = atelier.currentParticipants >= atelier.maxParticipants

  const gererInscription = () => {
    if (atelier.isEnrolled) {
      seDesinscrire(atelier.id)
    } else if (!estComplet) {
      sInscrire(atelier.id)
    }
  }

  return (
    <div className="container py-4">
      <button
        className="btn btn-outline-secondary btn-sm mb-4"
        onClick={() => naviguer(-1)}
      >
        ← Retour
      </button>

      <div className="carte-detail">
        <div className="row g-4">
          <div className="col-md-5">
            <div className={`detail-image ${atelier.couleurImage}`}>
              {atelier.nomImage}
            </div>
          </div>

          <div className="col-md-7">
            <h2 className="fw-bold mb-2">{atelier.title}</h2>
            <p className="text-muted mb-4">{atelier.description}</p>

            <hr />

            <div className="row g-3 mb-4">
              <div className="col-6">
                <span className="fw-semibold">Catégorie : </span>
                <span className="text-muted">{atelier.category}</span>
              </div>
              <div className="col-6">
                <span className="fw-semibold">Date : </span>
                <span className="text-muted">{atelier.date}</span>
              </div>
              <div className="col-6">
                <span className="fw-semibold">Heure : </span>
                <span className="text-muted">{atelier.time}</span>
              </div>
              <div className="col-6">
                <span className="fw-semibold">Durée : </span>
                <span className="text-muted">{atelier.duration}min</span>
              </div>
              <div className="col-12">
                <span className="fw-semibold">Instructeur : </span>
                <span className="text-muted">{atelier.instructor.name}</span>
              </div>
            </div>

            <hr />

            <h5 className="fw-bold mb-3">Participants</h5>

            <div className="barre-progression-conteneur mb-2" style={{ height: '8px' }}>
              <div
                className="barre-progression-remplissage"
                style={{ width: `${pourcentage}%` }}
              />
            </div>
            <p className="text-muted mb-3" style={{ fontSize: '.9rem' }}>
              {atelier.currentParticipants}/{atelier.maxParticipants}
            </p>

            <div className="d-flex gap-2 mb-4">
              {atelier.tags.map(tag => (
                <span key={tag} style={{ fontSize: '.85rem', color: '#3b4fd8' }}>
                  #{tag}
                </span>
              ))}
            </div>

            <button
              className={`btn w-100 py-3 fw-semibold ${
                atelier.isEnrolled
                  ? 'bouton-inscrit btn-success'
                  : estComplet
                    ? 'btn-secondary'
                    : 'btn-primary'
              }`}
              onClick={gererInscription}
              disabled={estComplet && !atelier.isEnrolled}
              style={{ background: atelier.isEnrolled ? undefined : '#3b4fd8', border: 'none' }}
            >
              {atelier.isEnrolled ? '✓ Inscrit' : estComplet ? 'Complet' : "S'inscrire"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailAtelier
