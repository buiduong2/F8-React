import { ThemeProvider } from '@material-tailwind/react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/style.css'
import router from './router.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
	<ThemeProvider>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</ThemeProvider>
)
