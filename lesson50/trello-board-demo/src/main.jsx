import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './assets/style.css'
import ConfirmProvider from './providers/ConfirmProvider.jsx'
import { store } from './redux/store'
createRoot(document.getElementById('root')).render(
	<ConfirmProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</ConfirmProvider>
)
