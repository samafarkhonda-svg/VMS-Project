import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"   // ✅ important
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   {/* ✅ THIS FIXES YOUR APP */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)