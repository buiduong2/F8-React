import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import './assets/style.css'
import { ThemeProvider } from '@material-tailwind/react'


const domain = import.meta.env.VITE_DOMAIN
const clientId = import.meta.env.VITE_CLIENT_ID


createRoot(document.getElementById('root')).render(
	<ThemeProvider>
		<Auth0Provider
			domain={domain}
			clientId={clientId}
		>
			<App />
		</Auth0Provider>
	</ThemeProvider>
)
