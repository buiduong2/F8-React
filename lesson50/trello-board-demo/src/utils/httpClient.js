import axios from 'axios'
export const apiUrl = import.meta.env.VITE_API_URL

const client = axios.create({
	baseURL: apiUrl
})

export function setAuthApi(apiKey) {
	client.defaults.headers.common['X-Api-Key'] = apiKey
}

export function logout() {
	delete client.defaults.headers.common['X-Api-Key']
}

export function login(email) {
	return client.get(`/api-key?email=${email}`)
}

export async function getData() {
	const res = await client.get('/tasks')

	const data = res.data
	if (data.code === 200) {
		const isValid = validateData(data)
		if (!isValid) return { code: 400 }

		const tasks = extractToTasks(data)
		const columns = extractToColumns(data)
		console.log(mergeToColumns(columns, tasks))
		return {
			code: 200,
			data: mergeToColumns(columns, tasks)
		}
	}

	return {
		code: 403
	}
}

export function updateData(columns) {
	const data = flatColumn(columns)
	return 	client.post('/tasks', data)
}

function flatColumn(columns) {
	return columns.flatMap(col => {
		return col.rows.map(row => ({
			content: `${row.content}$${row.id}`,
			column: `${col.name}$${col.id}`,
			columnName: `${col.name}$${col.id}`
		}))
	})
}

function extractToTasks(response) {
	return response.data.tasks.map(task => ({
		id: task.content.slice(task.content.length - 36),
		content: task.content.slice(0, task.content.length - 37),
		columnId: task.column.slice(task.column.length - 36)
	}))
}

function extractToColumns(response) {
	return response.data.columns.map(col => ({
		id: col.column.slice(col.column.length - 36),
		name: col.column.slice(0, col.column.length - 37)
	}))
}

function mergeToColumns(columns, tasks) {
	return columns.map(column => ({
		...column,
		rows: tasks.filter(task => task.columnId === column.id)
	}))
}

function validateData(response) {
	const regex =
		/\$[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

	const isColumnValid = response.data.columns.every(col => {
		return regex.test(col.column)
	})
	if (!isColumnValid) return false

	const isTaskValid = response.data.tasks.every(task => {
		return regex.test(task.content) && regex.test(task.column)
	})

	if (!isTaskValid) return false

	return true
}
