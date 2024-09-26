import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style.scss'
import { createApi } from './utils/api.js'

const apiUrl = import.meta.env.VITE_API_URL

export const apiClient = createApi({ apiUrl })

createRoot(document.getElementById('root')).render(<App />)
