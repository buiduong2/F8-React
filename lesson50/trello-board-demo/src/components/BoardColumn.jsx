/* eslint-disable react/prop-types */
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import SortableMin from 'sortablejs'
import useConfirm from '../providers/useConfirm'
import {
	addTask,
	editColumn,
	moveTask,
	removeColumn
} from '../redux/boardSlice'
import FormAdd from './AppForm'
import AppTextarea from './AppTextarea'
import Task from './BoardColumnTask'

export default function BoardColumn({ column, columnIndex }) {
	const [isAddingTask, setIsAddingTask] = useState(false)
	const [isEditingName, setIsEditing] = useState(false)

	const { openConfirm } = useConfirm()

	const refList = useRef()

	const dispatch = useDispatch()

	function handleOnBlurName(e) {
		setIsEditing(false)
		const columnName = e.target.value
		if (columnName.length === 0) {
			e.target.value = column.name
		} else if (columnName !== column.name) {
			dispatch(editColumn({ columnIndex, columnName }))
		}
	}

	function handleOnClickDeleteBtn() {
		openConfirm({
			label: 'Bạn sẽ xóa cột này chứ',
			onSubmit: () => dispatch(removeColumn({ columnIndex }))
		})
	}

	function handleOnAddTask(taskName) {
		dispatch(addTask({ taskName, columnIndex }))
	}

	useEffect(() => {
		const sortable = new SortableMin(refList.current, {
			group: 'task',
			handle: '.draggable',
			ghostClass: 'task-ghost',
			animation: 150,

			onStart: evt => {
				evt.item.classList.add('dragging') // Thêm class cho phần tử đang kéo
			},
			onEnd: function (evt) {
				evt.item.classList.remove('dragging') //
				const fromColumnIndex = evt.from.dataset.index
				const toColumnIndex = evt.to.dataset.index
				const fromTaskIndex = evt.oldIndex
				const toTaskIndex = evt.newIndex
				evt.from.insertBefore(evt.item, evt.from.children[evt.oldIndex])

				dispatch(
					moveTask({
						fromColumnIndex,
						toColumnIndex,
						fromTaskIndex,
						toTaskIndex
					})
				)
			}
		})
		return () => sortable.destroy()
	}, [])

	return (
		<>
			<article
				className={`${!isEditingName && !isAddingTask ? 'draggable' : ''} shadow-box flex max-h-full flex-col overflow-hidden rounded-lg bg-slate-200`}
			>
				<div className="flex items-start gap-2 px-2 pl-3 text-slate-700">
					<div className="mb-1 mt-2 flex-grow font-semibold">
						<AppTextarea
							className="bg-slate-200 px-3 py-1"
							defaultValue={column.name}
							onBlur={handleOnBlurName}
							onFocus={() => setIsEditing(true)}
						/>
					</div>
					<div
						className="mt-2 rounded p-2 transition-colors hover:cursor-pointer hover:bg-slate-300"
						onClick={handleOnClickDeleteBtn}
					>
						<TrashIcon className="size-4" />
					</div>
				</div>

				<ul
					data-index={columnIndex}
					ref={refList}
					className="mx-1 flex flex-col gap-2 overflow-y-auto px-1 scrollbar-thin scrollbar-track-slate-300/80 scrollbar-thumb-slate-400/50"
				>
					{column.rows.map((task, index) => (
						<Task
							key={task.id}
							task={task}
							taskIndex={index}
							columnIndex={columnIndex}
							onTaskEdit={() => setIsEditing(true)}
						/>
					))}
					{isAddingTask && (
						<FormAdd
							title={'Tạo công việc'}
							onSubmit={handleOnAddTask}
							className="p-0 pb-2"
							onClose={() => setIsAddingTask(false)}
						/>
					)}
				</ul>
				{!isAddingTask && (
					<div className="rounded-b-lg px-2 py-2">
						<button
							onClick={() => setIsAddingTask(true)}
							className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-300"
						>
							<PlusIcon className="size-4" />
							<span> Thêm thẻ</span>
						</button>
					</div>
				)}
			</article>
		</>
	)
}
