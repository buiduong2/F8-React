import { configureStore } from '@reduxjs/toolkit'
import boardReducer, { boardMiddleware } from './boardSlice'
import authReducer from './authSlice'
export const store = configureStore({
	reducer: {
		board: boardReducer,
		auth: authReducer
	},
	middleware: mw => mw().concat(boardMiddleware)
})
