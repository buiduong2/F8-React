import PropTypes from 'prop-types'
import AppInput from './AppInput'
import AppButton from './AppButton'
import { useState } from 'react'

TodoListItem.propTypes = {
	todo: PropTypes.object.isRequired,
	onDelete: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onClick: PropTypes.func
}

function TodoListItem({ todo, onDelete, onEdit, onClick }) {
	const [isEditMode, setIsEditMode] = useState(false)
	const [newTodo, setNewTodo] = useState({ ...todo })
	const [isLoading, setIsLoading] = useState(false)

	function handleToggleEditModeBtn(e) {
		e.preventDefault()
		if (isEditMode) {
			setNewTodo({ ...todo })
		}
		setIsEditMode(!isEditMode)
	}

	async function handleEditBtn(e) {
		e.preventDefault()
		try {
			setIsLoading(true)
			await onEdit(newTodo._id, newTodo)
			setIsEditMode(false)
		} finally {
			setIsLoading(false)
		}
	}

	async function handleClickDeleteBtn(e) {
		e.preventDefault()
		try {
			setIsLoading(true)
			await onDelete(newTodo._id)
		} finally {
			setIsLoading(false)
		}
	}

	function handleClickToggleCompleteBtn(e) {
		if (e.target.dataset.id === 'complete-checkbox') {
			return
		}
		e.preventDefault()
		e.currentTarget
			.querySelector('input[data-id="complete-checkbox"]')
			.click()
	}

	function handleOnChangeInput(e) {
		setNewTodo({ ...newTodo, todo: e.target.value })
	}

	function handleOnChangeCheckbox() {
		setNewTodo({ ...newTodo, isCompleted: !newTodo.isCompleted })
	}

	return (
		<li
			className={`relative mb-5 rounded-md bg-white px-8 py-6 shadow-md shadow-teal-500/30 ${isLoading && 'animate-pulse'}`}
			onClick={onClick}
		>
			{isLoading && <div className="absolute inset-0 z-50"></div>}
			<div className="mb-3">
				<AppInput
					disabled={!isEditMode}
					name="todo"
					value={newTodo.todo}
					onChange={handleOnChangeInput}
					className={newTodo.isCompleted ? 'line-through' : ''}
				/>
			</div>

			{!isEditMode ? (
				<div className="flex gap-2">
					<AppButton onClick={handleToggleEditModeBtn}>Sửa</AppButton>
					<AppButton onClick={handleClickDeleteBtn}>Xóa</AppButton>
				</div>
			) : (
				<div className="flex justify-between gap-2">
					<div>
						<AppButton
							onClick={handleClickToggleCompleteBtn}
							variant="success"
							className="flex items-center gap-3"
						>
							Đánh dấu Complete
							<input
								type="checkbox"
								className="size-5"
								data-id="complete-checkbox"
								name="isComplete"
								defaultChecked={todo.isCompleted}
								onChange={handleOnChangeCheckbox}
							/>
						</AppButton>
					</div>
					<div className="flex gap-2">
						<AppButton
							onClick={handleToggleEditModeBtn}
							variant="warning"
						>
							Thoát
						</AppButton>
						<AppButton onClick={handleEditBtn}>Cập Nhật</AppButton>
						<AppButton
							onClick={handleClickDeleteBtn}
							variant="danger"
						>
							Xóa
						</AppButton>
					</div>
				</div>
			)}
		</li>
	)
}

export default TodoListItem
