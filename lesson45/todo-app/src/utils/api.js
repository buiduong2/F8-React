import axios from 'axios'
import { addNotification, createDeferred } from '.'

let apiKeyDeferred = createDeferred()
let apiClient = null
let apiKey = apiKeyDeferred.promise
let handleUnauthorize

export function setApiKey(key) {
	apiKeyDeferred.resolve(key)
}

export function setUnautorizeHandle(fn) {
	handleUnauthorize = fn
}

export function removeCurrentApiKey() {
	apiKeyDeferred = createDeferred()
	apiKey = apiKeyDeferred.promise
}

export function createApi(options) {
	apiClient = axios.create({
		baseURL: options.apiUrl,
		timeout: 3000,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	apiClient.interceptors.request.use(async config => {
		if (config.url !== '/api-key') {
			config.headers['X-Api-Key'] = await apiKey
		}
		return config
	})

	apiClient.interceptors.response.use(
		res => {
			let url = res.config.url
			if (url === '/todos' && res.config.method === 'get') {
				addNotification({
					content: 'Lấy về Todo Thành công',
					type: 'info'
				})
			} else if (url === '/api-key') {
				addNotification({
					content: 'Đăng nhập thành công',
					type: 'info'
				})
			} else {
				addNotification({
					content: res.data.message,
					type: 'success'
				})
			}
			return res
		},
		error => {
			if (error.response?.data.message) {
				if (error.response.data.code === 401) {
					handleUnauthorize?.()
				} else {
					addNotification({
						content: error.response.data.message,
						type: 'error'
					})
				}
			}
			return Promise.reject(error)
		}
	)

	return apiClient
}

export async function getApiKey(email) {
	const res = await apiClient.get('/api-key', {
		params: { email }
	})
	return res.data.data.apiKey
}

export async function getTodos(q) {
	const options = {}
	if (q) {
		options.params = { q }
	}
	const res = await apiClient.get('/todos', options)
	const data = res.data
	return data.data.listTodo
}

export async function editTodo(id, data) {
	const res = await apiClient.patch('/todos/' + id, {
		todo: data.todo,
		isCompleted: data.isCompleted
	})
	return res.data.data
}

export async function deleteTodo(id) {
	await apiClient.delete('/todos/' + id)
}

export async function addTodo(content) {
	const res = await apiClient.post('/todos', {
		todo: content
	})
	return res.data.data
}
