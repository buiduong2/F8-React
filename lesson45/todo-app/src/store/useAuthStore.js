import { createContext, useContext } from 'react'
import {
	getApiKey,
	removeCurrentApiKey,
	setApiKey,
	setUnautorizeHandle
} from '../utils/api'
import { addNotification } from '../utils'
export const AuthContext = createContext()

export default function useAuthStore() {
	const { authInfo, setAuthInfo } = useContext(AuthContext)
	setUnautorizeHandle(logoutError)

	async function login(email) {
		const apiKey = await getApiKey(email)

		const newAuthInfo = { apiKey, email }
		setAuthInfo(newAuthInfo)
		localStorage.setItem('AUTH_INFO', JSON.stringify(newAuthInfo))
		setApiKey(apiKey)
	}

	function logoutManually() {
		addNotification({
			type: 'success',
			content: 'Đăng xuất thành công'
		})
		logout()
	}

	function logoutError() {
		addNotification({
			type: 'warning',
			content: 'Đăng xuất do xác thực thất bại'
		})
		logout()
	}

	function logout() {
		setAuthInfo(null)
		localStorage.removeItem('AUTH_INFO')
		removeCurrentApiKey()
	}

	function isAuthenticated() {
		return !!authInfo
	}

	async function init() {
		const prevAuthInfo = JSON.parse(localStorage.getItem('AUTH_INFO'))
		if (prevAuthInfo) {
			try {
				await login(prevAuthInfo.email)
			} catch (error) {
				logoutError()
				throw error
			}
		}
	}

	return {
		logout: logoutManually,
		isAuthenticated,
		login,
		init
	}
}
