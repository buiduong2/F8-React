import { useEffect, useState } from 'react'
import NotificationList from './components/NotificationList'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import {
	addTodo,
	deleteTodo,
	editTodo,
	getTodos,
	setAddNotificationFn
} from './utils/api'
import TodoListLoading from './components/TodoListLoading'

function App() {
	const [todos, setTodos] = useState([])
	const [notifications, setNotifications] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isAddingNewTodo, setIsAddingNewTodo] = useState(false)

	setAddNotificationFn(addNotification)

	// Todo
	async function handleEditTodo(id, data) {
		const newTodo = await editTodo(id, data)
		setTodos(prevTodos =>
			prevTodos.map(todo => (todo._id === id ? newTodo : todo))
		)
	}

	async function handleDeleteTodo(id) {
		const todo = todos.find(todo => todo._id === id)
		const shortTodoTitle = todo.todo
			.slice(0, 10)
			.padEnd(Math.min(todo.todo.length, 13), '...')

		return new Promise(resolve => {
			addNotification({
				content: 'Bạn có chắc chắn muốn xóa todo: ' + shortTodoTitle,
				info: 'Bấm vào đây để xác nhận',
				type: 'warning',
				onClick: async () => {
					await deleteTodo(id)
					resolve()
					setTodos(prevTodos =>
						prevTodos.filter(todo => todo._id != id)
					)
				},
				onDelete: resolve
			})
		})
	}

	async function handleAddTodo(content) {
		try {
			setIsAddingNewTodo(true)
			const newTodo = await addTodo(content)
			setTodos(prevTodos => [newTodo, ...prevTodos])
		} finally {
			setIsAddingNewTodo(false)
		}
	}

	async function initTodos() {
		setTodos(await getTodos())
		setIsLoading(false)
	}

	useEffect(() => {
		initTodos()
	}, [])

	// Notification
	function addNotification(notification) {
		notification._id = String(Math.random())

		setNotifications(prevNotifications => [
			...prevNotifications,
			notification
		])
	}

	function handleDeleteNotification(id) {
		setNotifications(prevNotificaitons =>
			prevNotificaitons.filter(noti => noti._id != id)
		)
	}

	return (
		<>
			<NotificationList
				notifications={notifications}
				onDeleteItem={handleDeleteNotification}
			/>
			<div className="min-h-screen bg-slate-700 p-7">
				<div className="mx-auto max-w-xl">
					<h1 className="mb-5 text-center text-xl font-semibold text-white">
						Welcome to Todo App
					</h1>

					<TodoForm
						className="mx-auto mb-8 w-[80%]"
						onSubmit={handleAddTodo}
						addNotification={addNotification}
					/>
					{isLoading ? (
						<TodoListLoading />
					) : (
						<TodoList
							todos={todos}
							onEditItem={handleEditTodo}
							onDeleteItem={handleDeleteTodo}
						>
							{isAddingNewTodo ? <TodoListLoading /> : undefined}
						</TodoList>
					)}
				</div>
			</div>
		</>
	)
}

export default App
