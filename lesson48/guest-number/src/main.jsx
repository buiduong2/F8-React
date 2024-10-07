import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './config/chakraUITheme'
import toast from './config/chakraToast.js'
createRoot(document.getElementById('root')).render(
	<ChakraProvider
		toastOptions={toast}
		initialColorMode={theme.config.initialColorMode}
	>
		<App />
	</ChakraProvider>
)
