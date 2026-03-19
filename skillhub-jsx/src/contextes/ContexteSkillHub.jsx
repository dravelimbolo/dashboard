import { createContext, useContext, useState } from 'react'
import { mockUtilisateur, mockAteliers } from '../données/mockData'

const ContexteSkillHub = createContext(null)

export function FournisseurSkillHub({ children }) {
  const [utilisateur, setUtilisateur] = useState(mockUtilisateur)
  const [ateliers, setAteliers] = useState(mockAteliers)

  const sInscrire = (atelierId) => {
    setUtilisateur(prev => ({
      ...prev,
      enrolledWorkshops: [...prev.enrolledWorkshops, atelierId],
    }))
    setAteliers(prev =>
      prev.map(a =>
        a.id === atelierId
          ? { ...a, isEnrolled: true, currentParticipants: a.currentParticipants + 1 }
          : a
      )
    )
  }

  const seDesinscrire = (atelierId) => {
    setUtilisateur(prev => ({
      ...prev,
      enrolledWorkshops: prev.enrolledWorkshops.filter(id => id !== atelierId),
    }))
    setAteliers(prev =>
      prev.map(a =>
        a.id === atelierId
          ? { ...a, isEnrolled: false, currentParticipants: a.currentParticipants - 1 }
          : a
      )
    )
  }

  const valeur = {
    utilisateur,
    ateliers,
    sInscrire,
    seDesinscrire,
  }

  return (
    <ContexteSkillHub.Provider value={valeur}>
      {children}
    </ContexteSkillHub.Provider>
  )
}

export function utiliserSkillHub() {
  const contexte = useContext(ContexteSkillHub)
  if (!contexte) {
    throw new Error('utiliserSkillHub doit être utilisé dans FournisseurSkillHub')
  }
  return contexte
}
