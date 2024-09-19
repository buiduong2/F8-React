import axios from 'axios'

let apiUrl = null
let email = null
let apiKey = null
let apiClient = null

let addNotification = function () {}

export function setAddNotificationFn(fn) {
	addNotification = fn
}

export function createApi(options) {
	apiUrl = options.apiUrl
	email = options.email
	apiClient = axios.create({
		baseURL: apiUrl,
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
					content: 'Đăng nhập thành cộng',
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
			if (error.response.data.message) {
				addNotification({
					content: error.response.data.message,
					type: 'error'
				})
			}
			return Promise.reject(error)
		}
	)
}

export function getApiKey() {
	async function inner() {
		const res = await apiClient.get('/api-key', {
			params: {
				email: email
			}
		})
		return res.data.data.apiKey
	}

	apiKey = inner()
}

export async function getTodos() {
	const res = await apiClient.get('/todos')
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
