export type NiveauAtelier = 'beginner' | 'intermediate' | 'advanced'
export type StatutAtelier = 'upcoming' | 'ongoing' | 'completed'
export type RoleUtilisateur = 'learner' | 'instructor'

export interface Instructeur {
  nom: string
  avatar: string
}

export interface Atelier {
  id: string
  titre: string
  description: string
  date: string
  heure: string
  duree: number
  niveau: NiveauAtelier
  categorie: string
  instructeur: Instructeur
  nomImage: string
  maxParticipants: number
  currentParticipants: number
  estInscrit?: boolean
  statut: StatutAtelier
  tags: string[]
}

export interface Utilisateur {
  id: string
  nom: string
  email: string
  avatar: string
  role: RoleUtilisateur
  ateliersInscrits: string[]
}

export interface Filtres {
  recherche: string
  categorie: string
  niveau: string
}

export interface ContexteSkillHubType {
  ateliers: Atelier[]
  utilisateur: Utilisateur
  sInscrire: (id: string) => void
  seDesinscrire: (id: string) => void
}
