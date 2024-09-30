import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style.css'
import { ThemeProvider } from '@material-tailwind/react'

export const apiUrl = import.meta.env.VITE_API_URL || ''

createRoot(document.getElementById('root')).render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
)
