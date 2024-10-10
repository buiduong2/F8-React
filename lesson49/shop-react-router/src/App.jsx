import { createContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppProgress from './components/AppProgress'
import DefaultLayout from './layout/DefaultLayout'
import AppScrollToTop from './components/AppScrollToTop'
export const BackNavigateContext = createContext()
function App() {
	const location = useLocation()
	const [isFromMyApp, setIsFromMyApp] = useState(false)
	const navigate = useNavigate()

	function backNavigate() {
		if (isFromMyApp) {
			navigate(-1)
		} else {
			navigate('/')
		}
	}

	useEffect(() => {
		return () => {
			if (!isFromMyApp) {
				setIsFromMyApp(true)
			}
		}
	}, [location, isFromMyApp])

	return (
		<DefaultLayout>
			<BackNavigateContext.Provider value={{ backNavigate }}>
				<AppProgress />

				<Outlet />
				<ToastContainer
					position="top-right"
					autoClose={2000}
					className="!top-16"
				/>
				<AppScrollToTop />
			</BackNavigateContext.Provider>
		</DefaultLayout>
	)
}

export default App
