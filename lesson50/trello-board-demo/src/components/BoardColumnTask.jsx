/* eslint-disable react/prop-types */
import { TrashIcon } from '@heroicons/react/24/solid'
import AppTextarea from './AppTextarea'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask, removeTask } from '../redux/boardSlice'

export default function Task({ task, columnIndex, taskIndex }) {
	const [value, setValue] = useState(task.content)
	const dispatch = useDispatch()

	function handleOnBlurContent(e) {
		const taskName = e.target.value
		if (taskName && taskName.length !== 0) {
			dispatch(editTask({ columnIndex, taskIndex, taskName }))
		} else {
			handleRemove()
		}
	}

	function handleOnChange(e) {
		setValue(e.target.value)
	}

	function handleRemove() {
		dispatch(removeTask({ columnIndex, taskIndex }))
	}

	return (
		<li className="relative hover:text-black">
			<AppTextarea
				value={value}
				onBlur={handleOnBlurContent}
				onChange={handleOnChange}
				className="bg-white !px-3 !py-2 text-slate-500 hover:shadow-blue focus:text-black"
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
