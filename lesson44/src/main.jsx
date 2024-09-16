import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style.css'
import { ThemeProvider } from '@material-tailwind/react'
const theme = {
	typography: {
		styles: {
			colors: {
				gray: {
					color: 'text-gray-500'
				}
			},
			variants: {
				paragraph: {
					fontWeight: 'font-normal'
				}
			}
		}
	}
}
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider value={theme}>
			<App></App>
		</ThemeProvider>
	</StrictMode>
)
