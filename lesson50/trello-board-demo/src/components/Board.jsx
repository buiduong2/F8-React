import { useEffect, useRef, useState } from 'react'
import BoardAddColumnBtn from './BoardAddBtn'
import Column from './BoardColumn'
import FormAdd from './AppForm'
import { useDispatch, useSelector } from 'react-redux'
import { addColumn, moveColumn } from '../redux/boardSlice'
import SortableMin from 'sortablejs'

export default function Board() {
	const [isAddingColumn, setIsAddingColumn] = useState(false)
	const ref = useRef()

	const columns = useSelector(state => state.board.columns)
	const dispatch = useDispatch()

	function handleAddColumn(columnName) {
		dispatch(addColumn({ columnName }))
	}

	useEffect(() => {
		const sortable = new SortableMin(ref.current, {
			group: 'col',
			animation: 150,
			delay: 10,
			handle: '.draggable',
			ghostClass: "col-ghost",
			onEnd: function (evt) {
				const fromColumnIndex = evt.oldIndex
				const toColumnIndex = evt.newIndex
				evt.from.insertBefore(evt.item, evt.from.children[evt.oldIndex])

				dispatch(
					moveColumn({
						fromColumnIndex,
						toColumnIndex
					})
				)
			}
		})
		return () => sortable.destroy()
	}, [])

	return (
		<div className="mb-10 flex h-[87%] gap-4 overflow-x-auto pl-8 scrollbar scrollbar-track-[#9C446E] scrollbar-thumb-[#ce94b0]">
			<div ref={ref} className="flex h-full gap-4 py-8 pl-2">
				{columns.map((column, index) => (
					<div key={column.id} className="w-80 flex-shrink-0">
						<Column column={column} columnIndex={index} />
					</div>
				))}
			</div>
			<div className="mr-36 w-80 shrink-0 self-start py-8">
				{isAddingColumn ? (
					<FormAdd
						title={'Tạo Bảng'}
						onClose={() => setIsAddingColumn(false)}
						onSubmit={handleAddColumn}
					/>
				) : (
					<BoardAddColumnBtn
						onClick={() => setIsAddingColumn(true)}
					/>
				)}
			</div>
		</div>
	)
}
