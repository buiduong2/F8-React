import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
	name: 'cart',
	initialState: { cart: JSON.parse(localStorage.getItem('cart')) || [] },
	reducers: {
		addItem(state, { payload: product }) {
			let oldIndex = state.cart.findIndex(
				item => item._id === product._id
			)
			if (oldIndex !== -1) {
				state.cart[oldIndex].orderQuantity++
			} else {
				state.cart.push({
					...product,
					orderQuantity: 1
				})
				oldIndex = state.cart.length - 1
			}

			const updatedProduct = state.cart[oldIndex]
			updatedProduct.quantity--
			updatedProduct.totalPrice =
				updatedProduct.orderQuantity * updatedProduct.price
		},
		removeItem(state, { payload }) {
			state.cart = state.cart.filter(item => item._id !== payload._id)
		},

		updateItemQuantity(state, { payload }) {
			const { quantity, _id } = payload
			const oldItem = state.cart.find(item => item._id === _id)

			if (oldItem) {
				oldItem.orderQuantity = quantity
				oldItem.quantity -= quantity
				oldItem.totalPrice = oldItem.orderQuantity * oldItem.price
			}
		},
		checkout(state) {
			state.cart = []
		}
	}
})

export const { addItem, updateItemQuantity, removeItem, checkout } =
	cartSlice.actions

export const getOrderQuanitty = state =>
	state.cart.cart.reduce((total, product) => total + product.orderQuantity, 0)

export const getTotalPrice = state =>
	state.cart.cart.reduce((total, product) => total + product.totalPrice, 0)

export const saveLS = store => next => action => {
	const result = next(action)

	if (action.type.startsWith('cart')) {
		localStorage.setItem('cart', JSON.stringify(store.getState().cart.cart))
	}
	return result
}
