import { useState, useMemo } from 'react'
import type { Filtres } from '../types'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'
import CarteAtelier from '../composants/CarteAtelier'
import FiltresAteliers from '../composants/FiltresAteliers'

const filtresInitiaux: Filtres = { recherche: '', categorie: '', niveau: '' }

function TousLesAteliers() {
  const { ateliers } = utiliserSkillHub()
  const [filtres, setFiltres] = useState<Filtres>(filtresInitiaux)

  const mettreAJourFiltre = (cle: keyof Filtres, valeur: string) => {
    setFiltres((prev) => ({ ...prev, [cle]: valeur }))
  }

  const ateliersFiltres = useMemo(() => {
    return ateliers.filter((a) => {
      const correspondRecherche =
        filtres.recherche === '' ||
        a.titre.toLowerCase().includes(filtres.recherche.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(filtres.recherche.toLowerCase()))
      const correspondCategorie =
        filtres.categorie === '' || a.categorie === filtres.categorie
      const correspondNiveau =
        filtres.niveau === '' || a.niveau === filtres.niveau
      return correspondRecherche && correspondCategorie && correspondNiveau
    })
  }, [ateliers, filtres])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tous les Ateliers</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-64 shrink-0">
          <FiltresAteliers
            filtres={filtres}
            surChangement={mettreAJourFiltre}
            surReinit={() => setFiltres(filtresInitiaux)}
          />
        </aside>
        <main className="flex-1">
          <p className="text-sm text-gray-500 mb-4">
            {ateliersFiltres.length} résultat(s)
          </p>
          {ateliersFiltres.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              Aucun atelier ne correspond à vos critères.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {ateliersFiltres.map((atelier) => (
                <CarteAtelier key={atelier.id} atelier={atelier} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default TousLesAteliers
