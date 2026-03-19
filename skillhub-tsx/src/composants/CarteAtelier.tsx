import { useNavigate } from 'react-router-dom'
import type { Atelier } from '../types'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'

interface PropsCarteAtelier {
  atelier: Atelier
}

const couleursImage: Record<string, string> = {
  react: 'from-cyan-500 to-blue-600',
  typescript: 'from-blue-600 to-indigo-700',
  css: 'from-purple-500 to-pink-600',
  node: 'from-green-500 to-emerald-700',
  sql: 'from-orange-500 to-amber-600',
  git: 'from-red-500 to-rose-700',
}

const etiquettesNiveau: Record<string, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
}

const couleursNiveau: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
}

const couleursStatut: Record<string, string> = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-gray-100 text-gray-600',
}

const etiquettesStatut: Record<string, string> = {
  upcoming: 'À venir',
  ongoing: 'En cours',
  completed: 'Terminé',
}

function BadgeStatut({ statut }: { statut: string }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${couleursStatut[statut] ?? 'bg-gray-100 text-gray-600'}`}>
      {etiquettesStatut[statut] ?? statut}
    </span>
  )
}

function BarreProgression({ actuel, max }: { actuel: number; max: number }) {
  const pourcentage = Math.round((actuel / max) * 100)
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{actuel}/{max} participants</span>
        <span>{pourcentage}%</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-500 rounded-full transition-all"
          style={{ width: `${pourcentage}%` }}
        />
      </div>
    </div>
  )
}

function CarteAtelier({ atelier }: PropsCarteAtelier) {
  const { sInscrire, seDesinscrire } = utiliserSkillHub()
  const naviguer = useNavigate()
  const complet = atelier.currentParticipants >= atelier.maxParticipants

  const gererInscription = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (atelier.estInscrit) {
      seDesinscrire(atelier.id)
    } else if (!complet) {
      sInscrire(atelier.id)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className={`h-32 bg-gradient-to-br ${couleursImage[atelier.nomImage] ?? 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
        <span className="text-white text-4xl font-bold opacity-30 uppercase">
          {atelier.nomImage}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{atelier.titre}</h3>
          <BadgeStatut statut={atelier.statut} />
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{atelier.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${couleursNiveau[atelier.niveau]}`}>
            {etiquettesNiveau[atelier.niveau]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {atelier.categorie}
          </span>
        </div>
        <BarreProgression actuel={atelier.currentParticipants} max={atelier.maxParticipants} />
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => naviguer(`/ateliers/${atelier.id}`)}
            className="flex-1 text-xs py-1.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
          >
            Détails
          </button>
          <button
            onClick={gererInscription}
            disabled={!atelier.estInscrit && complet}
            className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${
              atelier.estInscrit
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : complet
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {atelier.estInscrit ? 'Inscrit ✓' : complet ? 'Complet' : "S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarteAtelier
