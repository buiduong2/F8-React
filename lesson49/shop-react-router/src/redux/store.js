import { configureStore } from '@reduxjs/toolkit'
import { cartSlice, saveLS } from './slices/cartSlice'
export const store = configureStore({
	reducer: {
		cart: cartSlice.reducer
	},
	middleware: mw => mw().concat(saveLS)
})
