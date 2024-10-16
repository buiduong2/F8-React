import { createSlice } from '@reduxjs/toolkit'
import { logout, setAuthApi } from '../utils/httpClient'

const initialState = {
	email: null,
	apiKey: localStorage.getItem('apiKey'),
	isAuthenticated: false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		init(state) {
			if (state.apiKey) {
				state.isAuthenticated = true
				setAuthApi(state.apiKey)
			}
		},
		saveInfo: (state, { payload }) => {
			state.email = payload.email
			state.apiKey = payload.apiKey
			state.isAuthenticated = true
			localStorage.setItem('apiKey', payload.apiKey)
			setAuthApi(payload.apiKey)
		},

		clearInfo: state => {
			state.email = null
			state.apiKey = null
			state.isAuthenticated = false
			localStorage.removeItem('apiKey')
			logout()
		}
	}
})

export const { saveInfo, clearInfo, init } = authSlice.actions

export default authSlice.reducer
