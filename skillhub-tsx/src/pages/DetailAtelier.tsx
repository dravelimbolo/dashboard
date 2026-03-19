import { useParams, useNavigate } from 'react-router-dom'
import { utiliserSkillHub } from '../contextes/ContexteSkillHub'

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

function DetailAtelier() {
  const { id } = useParams<{ id: string }>()
  const { ateliers, sInscrire, seDesinscrire } = utiliserSkillHub()
  const naviguer = useNavigate()

  const atelier = ateliers.find((a) => a.id === id)

  if (!atelier) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500 mb-4">Atelier introuvable.</p>
        <button
          onClick={() => naviguer('/ateliers')}
          className="text-sm text-blue-600 hover:underline"
        >
          Retour aux ateliers
        </button>
      </div>
    )
  }

  const pourcentage = Math.round(
    (atelier.currentParticipants / atelier.maxParticipants) * 100
  )
  const complet = atelier.currentParticipants >= atelier.maxParticipants

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => naviguer(-1)}
        className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1"
      >
        ← Retour
      </button>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div
          className={`h-48 bg-gradient-to-br ${couleursImage[atelier.nomImage] ?? 'from-gray-400 to-gray-600'} flex items-center justify-center`}
        >
          <span className="text-white text-6xl font-extrabold opacity-25 uppercase">
            {atelier.nomImage}
          </span>
        </div>
        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {atelier.categorie}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {etiquettesNiveau[atelier.niveau]}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{atelier.titre}</h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {atelier.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {atelier.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Formateur :</span>{' '}
                {atelier.instructeur.nom}
              </p>
              <p>
                <span className="font-medium">Date :</span>{' '}
                {new Date(atelier.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p>
                <span className="font-medium">Heure :</span> {atelier.heure}
              </p>
              <p>
                <span className="font-medium">Durée :</span> {atelier.duree} min
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Participants</p>
              <p className="text-2xl font-bold text-gray-900">
                {atelier.currentParticipants}
                <span className="text-sm font-normal text-gray-400">
                  /{atelier.maxParticipants}
                </span>
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${pourcentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{pourcentage}% rempli</p>
            </div>
            <button
              onClick={() =>
                atelier.estInscrit ? seDesinscrire(atelier.id) : sInscrire(atelier.id)
              }
              disabled={!atelier.estInscrit && complet}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                atelier.estInscrit
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : complet
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {atelier.estInscrit
                ? 'Se désinscrire'
                : complet
                ? 'Complet'
                : "S'inscrire"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailAtelier
