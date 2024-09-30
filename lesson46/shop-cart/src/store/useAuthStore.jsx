import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { login as loginApi } from '../api/authApi'

import myLocalStore from './useLocalStorage'

const localStore = myLocalStore()

export default function useAuthStore() {
	const [auth, setAuth] = useState(localStore.getAuthInfo())
	async function login(email) {
		try {
			const res = await loginApi(email)
			const apiKey = res.data.data.apiKey
			saveInfo({ email, apiKey })
		} catch (error) {
			if (error.response.data.code === 400) {
				toast.error(error.response.data.message)
			}
			clearInfo()
			throw error
		}
	}

	function saveInfo(userInfo) {
		setAuth(userInfo)
		localStore.saveAuthInfo(userInfo)
		axios.defaults.headers.common['X-Api-Key'] = userInfo.apiKey
	}

	function clearInfo() {
		setAuth(null)
		localStore.clearAuth()
	}

	useEffect(() => {
		if (auth) {
			login(auth.email)
		}
	}, [])

	return {
		login,
		auth
	}
}
