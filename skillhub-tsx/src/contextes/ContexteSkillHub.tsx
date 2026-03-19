import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ContexteSkillHubType, Atelier, Utilisateur } from '../types'
import { mockAteliers, mockUtilisateur } from '../données/mockData'

const ContexteSkillHub = createContext<ContexteSkillHubType | null>(null)

interface PropsF {
  children: ReactNode
}

export function FournisseurSkillHub({ children }: PropsF) {
  const [ateliers, setAteliers] = useState<Atelier[]>(mockAteliers)
  const [utilisateur, setUtilisateur] = useState<Utilisateur>(mockUtilisateur)

  const sInscrire = (id: string) => {
    setAteliers((precedents) =>
      precedents.map((a) =>
        a.id === id
          ? { ...a, estInscrit: true, currentParticipants: a.currentParticipants + 1 }
          : a
      )
    )
    setUtilisateur((precedent) => ({
      ...precedent,
      ateliersInscrits: [...precedent.ateliersInscrits, id],
    }))
  }

  const seDesinscrire = (id: string) => {
    setAteliers((precedents) =>
      precedents.map((a) =>
        a.id === id
          ? { ...a, estInscrit: false, currentParticipants: a.currentParticipants - 1 }
          : a
      )
    )
    setUtilisateur((precedent) => ({
      ...precedent,
      ateliersInscrits: precedent.ateliersInscrits.filter((aid) => aid !== id),
    }))
  }

  return (
    <ContexteSkillHub.Provider value={{ ateliers, utilisateur, sInscrire, seDesinscrire }}>
      {children}
    </ContexteSkillHub.Provider>
  )
}

export function utiliserSkillHub(): ContexteSkillHubType {
  const contexte = useContext(ContexteSkillHub)
  if (!contexte) {
    throw new Error('utiliserSkillHub doit être utilisé à l\'intérieur de FournisseurSkillHub')
  }
  return contexte
}
