import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FournisseurSkillHub } from './contextes/ContexteSkillHub'
import AppRouter from './router'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FournisseurSkillHub>
      <AppRouter />
    </FournisseurSkillHub>
  </StrictMode>
)
