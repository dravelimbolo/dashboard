import { useState, useMemo } from 'react'
import CarteAtelier from '../composants/CarteAtelier'
import FiltresAteliers from '../composants/FiltresAteliers'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'

const filtresInitiaux = {
  recherche: '',
  categorie: 'toutes',
  niveau: 'tous',
}

function TousLesAteliers() {
  const { ateliers, sInscrire, seDesinscrire } = utiliserSkillHub()
  const [filtres, setFiltres] = useState(filtresInitiaux)

  const gererChangementFiltre = (cle, valeur) => {
    setFiltres(prev => ({ ...prev, [cle]: valeur }))
  }

  const ateliersFiltres = useMemo(() => {
    return ateliers.filter(atelier => {
      const correspondRecherche = atelier.title
        .toLowerCase()
        .includes(filtres.recherche.toLowerCase())
      const correspondCategorie =
        filtres.categorie === 'toutes' || atelier.category === filtres.categorie
      const correspondNiveau =
        filtres.niveau === 'tous' || atelier.level === filtres.niveau
      return correspondRecherche && correspondCategorie && correspondNiveau
    })
  }, [ateliers, filtres])

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Tous les Ateliers</h2>

      <div className="row g-4">
        <div className="col-md-3">
          <FiltresAteliers
            filtres={filtres}
            surChangement={gererChangementFiltre}
            surReinit={() => setFiltres(filtresInitiaux)}
          />
        </div>

        <div className="col-md-9">
          <div className="grille-ateliers">
            {ateliersFiltres.length === 0 ? (
              <p className="text-muted text-center py-4">
                Aucun atelier ne correspond à vos critères.
              </p>
            ) : (
              <div className="row g-3">
                {ateliersFiltres.map(atelier => (
                  <div key={atelier.id} className="col-sm-6">
                    <CarteAtelier
                      atelier={atelier}
                      surInscription={sInscrire}
                      surDesinscription={seDesinscrire}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TousLesAteliers
