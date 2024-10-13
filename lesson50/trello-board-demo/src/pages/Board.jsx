import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSortable from '../hooks/useSortable'
import { addColumn, moveColumn } from '../redux/boardSlice'
import FormAdd from '../components/AppForm'
import BoardAddColumnBtn from '../components/BoardAddBtn'
import Column from '../components/BoardColumn'

export default function Board() {
	const [isAddingColumn, setIsAddingColumn] = useState(false)

	const columns = useSelector(state => state.board.columns)
	const dispatch = useDispatch()

	const handleMoveColumn = useRef(evt =>
		dispatch(
			moveColumn({
				fromColumnIndex: evt.oldIndex,
				toColumnIndex: evt.newIndex
			})
		)
	)

	const ref = useSortable('col', handleMoveColumn.current)

	function handleAddColumn(columnName) {
		dispatch(addColumn({ columnName }))
	}

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
