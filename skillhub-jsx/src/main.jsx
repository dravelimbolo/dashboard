import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FournisseurSkillHub } from './contextes/ContexteSkillHub'
import AppRouter from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FournisseurSkillHub>
      <AppRouter />
    </FournisseurSkillHub>
  </StrictMode>
)
