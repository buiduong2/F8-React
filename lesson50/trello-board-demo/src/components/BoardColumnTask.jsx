/* eslint-disable react/prop-types */
import { TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask, removeTask } from '../redux/boardSlice'
import AppTextarea from './AppTextarea'
import useConfirm from '../providers/useConfirm'

export default function Task({ task, columnIndex, taskIndex, onTaskEdit }) {
	const [value, setValue] = useState(task.content)
	const [isEditing, setIsEditing] = useState(false)

	const dispatch = useDispatch()
	const { openConfirm } = useConfirm()

	function handleOnBlurContent(e) {
		setIsEditing(false)
		const taskName = e.target.value
		if (taskName.length === 0) {
			openConfirm({
				onSubmit: handleRemove,
				onCancel: () => {
					setValue(task.content)
				},
				label: 'Bạn muốn xóa Task này chứ'
			})
			return
		} else if (taskName !== task.content) {
			dispatch(editTask({ columnIndex, taskIndex, taskName }))
		}
	}

	function handleOnChange(e) {
		setValue(e.target.value)
	}

	function handleRemove() {
		dispatch(removeTask({ columnIndex, taskIndex }))
	}

	return (
		<li
			className={`${!isEditing ? 'draggable' : ''} relative hover:text-black mb-0.5`}
		>
			<AppTextarea
				value={value}
				onFocus={() => {
					setIsEditing(true)
					onTaskEdit()
				}}
				onBlur={handleOnBlurContent}
				onChange={handleOnChange}
				className="bg-white !px-3 !py-2 text-slate-500 hover:shadow-blue focus:text-black shadow-box "
			/>
			<div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 p-2">
				<button
					onClick={handleRemove}
					className="opacity-15 transition-opacity hover:text-black hover:opacity-100"
				>
					<TrashIcon className="size-4" />
				</button>
			</div>
		</li>
	)
}
