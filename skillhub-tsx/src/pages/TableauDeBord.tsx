import { useState, useMemo } from 'react'
import type { Filtres } from '../types'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'
import CarteAtelier from '../composants/CarteAtelier'
import FiltresAteliers from '../composants/FiltresAteliers'

const filtresInitiaux: Filtres = { recherche: '', categorie: '', niveau: '' }

function TableauDeBord() {
  const { ateliers, utilisateur } = utiliserSkillHub()
  const [filtres, setFiltres] = useState<Filtres>(filtresInitiaux)

  const mettreAJourFiltre = (cle: keyof Filtres, valeur: string) => {
    setFiltres((prev) => ({ ...prev, [cle]: valeur }))
  }

  const reinitialiserFiltres = () => setFiltres(filtresInitiaux)

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
    <div>
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-1">
            Bonjour, {utilisateur.nom.split(' ')[0]} 👋
          </h1>
          <p className="text-blue-100 text-sm">
            {utilisateur.ateliersInscrits.length} atelier(s) en cours &nbsp;·&nbsp; Continuez à apprendre
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64 shrink-0">
            <FiltresAteliers
              filtres={filtres}
              surChangement={mettreAJourFiltre}
              surReinit={reinitialiserFiltres}
            />
          </aside>
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-700 text-sm">
                {ateliersFiltres.length} atelier(s) disponible(s)
              </h2>
            </div>
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
    </div>
  )
}

export default TableauDeBord
