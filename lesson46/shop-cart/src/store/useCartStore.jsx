import { useEffect, useState } from 'react'
import { orderApi } from '../api/cartApi'
import { toast } from 'react-toastify'

import myLocalStore from './useLocalStorage'

const localStore = myLocalStore()

export default function useCartStore() {
	const [cart, setCart] = useState([])

	function addToCart(product) {
		setCart(prev => {
			const newCart = JSON.parse(JSON.stringify(prev))
			const id = product._id

			let addedProduct = newCart.find(item => item._id === id)
			if (addedProduct) {
				addedProduct.orderQuantity++
			} else {
				addedProduct = { ...product, orderQuantity: 1 }
				newCart.push(addedProduct)
			}
			addedProduct.totalPrice =
				addedProduct.orderQuantity * addedProduct.price
			localStore.saveCart(newCart)
			return newCart
		})
	}

	function retriveCart() {
		const cart = localStore.getCart()
		if (cart) {
			setCart(cart)
		}
	}

	useEffect(() => retriveCart(), [])

	async function checkout() {
		const checkoutData = cart.map(item => ({
			productId: item._id,
			quantity: item.orderQuantity
		}))

		try {
			await orderApi(checkoutData)
			toast.success('Thanh toán thành công')
			clearCart()
		} catch (error) {
			toast.error(error.response.data.message)
			throw error
		}
	}

	function clearCart() {
		localStore.clearCart()
		setCart([])
	}

	return {
		checkout,
		addToCart,
		cart
	}
}
