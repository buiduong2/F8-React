import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './assets/style.css'
import ConfirmProvider from './providers/ConfirmProvider.jsx'
import { store } from './redux/store'

import {
	createBrowserRouter,
	redirect,
	replace,
	RouterProvider
} from 'react-router-dom'
import App from './App.jsx'
import Board from './pages/Board.jsx'
import Login from './pages/Login.jsx'
import { getData, login } from './utils/httpClient.js'
import { init as authInit, clearInfo, saveInfo } from './redux/authSlice.js'
import { setColumns } from './redux/boardSlice.js'
import { createError } from './redux/errorSlice.js'

store.dispatch(authInit())

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Board />,
				loader: async () => {
					if (store.getState().auth.isAuthenticated) {
						const response = await getData()
						if (response.code === 200) {
							store.dispatch(
								setColumns({ columns: response.data })
							)
						} else if (response.code === 400) {
							store.dispatch(
								createError({
									code: 400,
									type: 'board'
								})
							)
						} else if (response.code === 401) {
							store.dispatch(
								createError({
									code: 401,
									type: 'auth'
								})
							)
							console.log(response)
						}
						return ''
					}

					return replace('/login')
				}
			},
			{
				path: 'login',
				element: <Login />,
				errorElement: <Login />,
				loader: () => {
					if (store.getState().auth.isAuthenticated) {
						return redirect('/')
					}
					return null
				},
				action: async ({ request }) => {
					const formData = await request.formData()
					const email = formData.get('email')

					try {
						const response = await login(email)
						if (response.data.code === 200) {
							const apiKey = response.data.data.apiKey
							store.dispatch(saveInfo({ email, apiKey }))
							return redirect('/')
						}
					} catch (error) {
						throw error.response.data
					}
				}
			},
			{
				path: '/logout',
				loader() {
					return null
				},
				action() {
					store.dispatch(clearInfo())
					return redirect('/login')
				}
			}
		]
	}
])

createRoot(document.getElementById('root')).render(
	<ConfirmProvider>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</ConfirmProvider>
)
