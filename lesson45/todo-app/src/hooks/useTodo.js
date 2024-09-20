import {
	addTodo as fetchAddTodo,
	deleteTodo as fetchDeleteTodo,
	editTodo as fetchEditTodo,
	getTodos as fetchTodos
} from '../utils/api'
import { useState } from 'react'

export default function useTodo() {
	const [todos, setTodos] = useState([])

	async function addTodo(content) {
		const newTodo = await fetchAddTodo(content)
		setTodos(prevTodos => [newTodo, ...prevTodos])
	}

	async function editTodo(id, data) {
		const newTodo = await fetchEditTodo(id, data)
		setTodos(prevTodos =>
			prevTodos.map(todo => (todo._id === id ? newTodo : todo))
		)
	}

	async function deleteTodo(id) {
		await fetchDeleteTodo(id)
		setTodos(prevTodos => prevTodos.filter(todo => todo._id != id))
	}

	async function initTodo() {
		setTodos(await fetchTodos())
	}

	async function clearTodo() {
		setTodos([])
	}

	return {
		todos,
		addTodo,
		editTodo,
		deleteTodo,
		initTodo,
		clearTodo
	}
}
