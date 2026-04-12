import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { RecipesProvider } from './context/RecipesContext.jsx'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecipesProvider>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </RecipesProvider>
  </StrictMode>
)
 