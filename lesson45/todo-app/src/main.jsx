// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style.scss'
import { createApi, getApiKey } from './utils/api.js'

const email = import.meta.env.VITE_EMAIL 
const apiUrl = import.meta.env.VITE_API_URL

createApi({ email, apiUrl })
getApiKey();

createRoot(document.getElementById('root')).render(
	// <StrictMode>
	<App />
	// </StrictMode>,
)
