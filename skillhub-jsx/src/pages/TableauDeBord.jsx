import { useState, useMemo } from 'react'
import CarteAtelier from '../composants/CarteAtelier'
import FiltresAteliers from '../composants/FiltresAteliers'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'

const filtresInitiaux = {
  recherche: '',
  categorie: 'toutes',
  niveau: 'tous',
}

function TableauDeBord() {
  const { utilisateur, ateliers, sInscrire, seDesinscrire } = utiliserSkillHub()
  const [filtres, setFiltres] = useState(filtresInitiaux)

  const gererChangementFiltre = (cle, valeur) => {
    setFiltres(prev => ({ ...prev, [cle]: valeur }))
  }

  const reinitialiserFiltres = () => {
    setFiltres(filtresInitiaux)
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
      <div className="banniere-accueil">
        <h1>Bienvenue, {utilisateur.name} !</h1>
        <p className="mb-0" style={{ opacity: .85 }}>
          Découvrez des ateliers passionnants et développez vos compétences
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-3">
          <FiltresAteliers
            filtres={filtres}
            surChangement={gererChangementFiltre}
            surReinit={reinitialiserFiltres}
          />
        </div>

        <div className="col-md-9">
          <div className="grille-ateliers">
            <h5>
              Ateliers disponibles
              <span
                className="badge ms-2"
                style={{ background: '#e8eaf0', color: '#6c757d', fontSize: '.75rem' }}
              >
                {ateliersFiltres.length}
              </span>
            </h5>

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

export default TableauDeBord
