/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'
import TodoListLoading from '../components/TodoListLoading'
import TodoList from '../components/TodoList'
import useTodo from '../hooks/useTodo'
import useNotification from '../hooks/useNotification'

function Todo() {
	const { todos, addTodo, deleteTodo, editTodo, initTodo, clearTodo } =
		useTodo()
	const { addNotification } = useNotification()
	const [isLoading, setIsLoading] = useState(true)
	const [isAddingNewTodo, setIsAddingNewTodo] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		initTodo().finally(() => setIsLoading(false))

		return clearTodo
	}, [])

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

	return (
		<div className="">
			<TodoForm
				className="mx-auto mb-8 w-[80%]"
				onSubmit={handleAddTodo}
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
	)
}

Todo.propTypes = {}

export default Todo
