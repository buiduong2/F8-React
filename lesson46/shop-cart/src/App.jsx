import { createContext } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CartSection from './features/CartSection'
import Login from './features/Login'
import ProductSection from './features/ProductSection'
import useCartStore from './store/useCartStore'
import useAuthStore from './store/useAuthStore'

export const CartContext = createContext()

export const AuthContext = createContext()

function App() {
	const { addToCart, checkout, cart } = useCartStore()
	const { login, auth } = useAuthStore()

	return (
		<AuthContext.Provider value={{ login }}>
			<CartContext.Provider value={{ addToCart, checkout, cart }}>
				<main className="pt-5 pb-5 bg-blue-gray-700">
					{auth ? (
						<>
							<ProductSection />
							{cart.length !== 0 && <CartSection />}
						</>
					) : (
						<>
							<Login />
						</>
					)}
				</main>

				<ToastContainer
					position="top-right"
					autoClose={1000}
					closeOnClick
					pauseOnFocusLoss
					pauseOnHover
					theme="light"
					transition={Bounce}
				/>
			</CartContext.Provider>
		</AuthContext.Provider>
	)
}

export default App
