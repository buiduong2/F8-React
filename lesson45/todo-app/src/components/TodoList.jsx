import PropTypes from 'prop-types'
import TodoListItem from './TodoListItem'

TodoList.propTypes = {
	todos: PropTypes.array,
	onEditItem: PropTypes.func,
	onDeleteItem: PropTypes.func,
	children: PropTypes.object
}

function TodoList({ todos = [], onEditItem, onDeleteItem, children }) {
	return (
		<ul className="flex-col gap-4">
			{children}
			{!todos?.length ? (
				<li className="rounded-md bg-white px-8 py-6">Không có Todo</li>
			) : (
				todos.map(todo => (
					<TodoListItem
						key={todo._id}
						todo={todo}
						onEdit={onEditItem}
						onDelete={onDeleteItem}
					/>
				))
			)}
		</ul>
	)
}

export default TodoList
