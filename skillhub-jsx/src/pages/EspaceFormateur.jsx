import { mockInstructeurAteliers } from '../données/mockData'

function EspaceFormateur() {
  const ateliersCrees = mockInstructeurAteliers || []

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Espace Formateur</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div
            className="p-4 rounded-3 text-center"
            style={{ background: '#fff', border: '1px solid #e8eaf0' }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📚</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#3b4fd8' }}>
              {ateliersCrees.length}
            </div>
            <div className="text-muted">Ateliers créés</div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="p-4 rounded-3 text-center"
            style={{ background: '#fff', border: '1px solid #e8eaf0' }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#22c97a' }}>
              {ateliersCrees.reduce((s, a) => s + a.currentParticipants, 0)}
            </div>
            <div className="text-muted">Total participants</div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="p-4 rounded-3 text-center"
            style={{ background: '#fff', border: '1px solid #e8eaf0' }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706' }}>
              {ateliersCrees.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-muted">Terminés</div>
          </div>
        </div>
      </div>

      <div
        className="p-4 rounded-3"
        style={{ background: '#fff', border: '1px solid #e8eaf0' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Mes ateliers créés</h5>
          <button className="btn btn-primary btn-sm">+ Créer un atelier</button>
        </div>

        {ateliersCrees.length === 0 ? (
          <p className="text-muted text-center py-4">Aucun atelier créé pour l'instant.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Atelier</th>
                  <th>Catégorie</th>
                  <th>Date</th>
                  <th>Participants</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {ateliersCrees.map(atelier => (
                  <tr key={atelier.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{atelier.title}</div>
                      <div style={{ fontSize: '.8rem', color: '#6c757d' }}>
                        {atelier.level}
                      </div>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{ background: '#e8eaf0', color: '#3b4fd8' }}
                      >
                        {atelier.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '.88rem' }}>{atelier.date}</td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{atelier.currentParticipants}</span>
                      <span className="text-muted">/{atelier.maxParticipants}</span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-statut badge-${atelier.status}`}
                        style={{ position: 'static' }}
                      >
                        {atelier.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default EspaceFormateur
