export default function useLocalStorage() {
	function saveAuthInfo(authInfo) {
		localStorage.setItem('auth', JSON.stringify(authInfo))
		const cart = getCartInfo()
		if (cart && cart.email !== authInfo.email) {
			clearCart()
		}
	}

	function getAuthInfo() {
		let authInfo
		try {
			authInfo = JSON.parse(localStorage.getItem('auth')) ?? undefined
		} catch {
			authInfo = undefined
		}
		if (validateAuthInfo(authInfo)) {
			return authInfo
		} else {
			clearAuth()
		}
	}

	function clearAuth() {
		localStorage.removeItem('auth')
		clearCart()
	}

	// Cart
	function saveCart(items) {
		const email = getAuthInfo()?.email
		if (email) {
			const cartInfo = {
				email,
				items
			}

			localStorage.setItem('cart', JSON.stringify(cartInfo))
		}
	}
	function getCartInfo() {
		let cartInfo
		try {
			cartInfo = JSON.parse(localStorage.getItem('cart')) ?? undefined
		} catch {
			cartInfo = undefined
		}
		if (isValidCartInfo(cartInfo)) {
			return cartInfo
		} else {
			clearCart()
		}
	}

	function getCart() {
		return getCartInfo()?.items
	}

	function clearCart() {
		localStorage.removeItem('cart')
	}

	function validateAuthInfo(auth) {
		return typeof auth === 'object' && !!auth.apiKey && !!auth.email
	}

	function isValidCartInfo(cart) {
		return (
			typeof cart === 'object' &&
			Array.isArray(cart.items) &&
			!!cart.email
		)
	}

	return {
		saveAuthInfo,
		getAuthInfo,
		getCart,
		saveCart,
		clearAuth,
		clearCart
	}
}
