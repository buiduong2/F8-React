import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style.css'
import { ThemeProvider } from '@material-tailwind/react'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider>
			<App></App>
		</ThemeProvider>
	</StrictMode>
)
