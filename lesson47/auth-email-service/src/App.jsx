import { useAuth0 } from '@auth0/auth0-react'
import FormSendEmail from './components/FormSendEmail'
import LoginSection from './components/LoginSection'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
	const { isAuthenticated } = useAuth0()

	return (
		<>
			{isAuthenticated ? <FormSendEmail /> : <LoginSection />}
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
				className="z-50"
			/>
		</>
	)
}

export default App
