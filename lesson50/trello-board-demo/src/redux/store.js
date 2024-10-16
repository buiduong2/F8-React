import { configureStore } from '@reduxjs/toolkit'
import boardReducer, { boardMiddleware } from './boardSlice'
import authReducer from './authSlice'
import errorReducer from './errorSlice'
export const store = configureStore({
	reducer: {
		board: boardReducer,
		auth: authReducer,
		error: errorReducer
	},
	middleware: mw => mw().concat(boardMiddleware)
})
