/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'
import TodoListLoading from '../components/TodoListLoading'
import TodoList from '../components/TodoList'
import useTodoStore from '../store/useTodoStore'
import useNotificationStore from '../store/useNotificationStore'
import useTabStore from '../store/useTabStore'
import useDebounce from '../hooks/useDebounce'

function Todo() {
	const { todos, addTodo, deleteTodo, editTodo, initTodo, clearTodo } =
		useTodoStore()
	const { addNotification } = useNotificationStore()
	const [isLoading, setIsLoading] = useState(false)
	const [isAddingNewTodo, setIsAddingNewTodo] = useState(false)
	const { currentTab } = useTabStore()
	const debouncedSearchTodo = useDebounce(searchTodo, 1000)

	useEffect(() => {
		if (currentTab === 'TodoList') {
			setIsLoading(true)
			initTodo().finally(() => setIsLoading(false))
		}

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

	async function handleSubmit(content) {
		if (currentTab === 'TodoList') {
			setIsAddingNewTodo(true)
			await addTodo(content).finally(() => setIsAddingNewTodo(false))
		} else if (currentTab === 'TodoSearch') {
			setIsLoading(true)
			await debouncedSearchTodo.invokeImmediately(content)
		}
	}

	function handleFormValueUpdate(value) {
		if (currentTab === 'TodoSearch') {
			setIsLoading(true)
			debouncedSearchTodo.invoke(value)
		}
	}

	async function searchTodo(q) {
		await initTodo(q)
		setIsLoading(false)
	}

	return (
		<div className="">
			<TodoForm
				className="mx-auto mb-8 w-[80%]"
				onSubmit={handleSubmit}
				onUpdateValue={handleFormValueUpdate}
				type={currentTab === 'TodoList' ? 'add' : 'search'}
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
