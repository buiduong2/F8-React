import { useEffect, useState } from 'react'
import NotificationList from './components/NotificationList'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoListLoading from './components/TodoListLoading'
import useTodo from './hooks/useTodo'
import useNotification from './hooks/useNotification'

function App() {
	const { todos, addTodo, deleteTodo, editTodo, initTodo, clearTodo } =
		useTodo()
	const { addNotification, notifications, deleteNotification } =
		useNotification()
	const [isLoading, setIsLoading] = useState(true)
	const [isAddingNewTodo, setIsAddingNewTodo] = useState(false)

	async function handleEditTodo(id, data) {
		await editTodo(id, data)
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
				onClick: async () => resolve(await deleteTodo(id)),
				onDelete: resolve
			})
		})
	}

	function handleAddTodo(content) {
		setIsAddingNewTodo(true)
		addTodo(content).finally(() => setIsAddingNewTodo(false))
	}

	useEffect(() => {
		setIsLoading(true)
		initTodo().finally(() => setIsLoading(false))

		return clearTodo
	}, [])

	return (
		<>
			<NotificationList
				notifications={notifications}
				onDeleteItem={deleteNotification}
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
