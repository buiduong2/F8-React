import { useState } from 'react'
import BoardAddColumnBtn from './BoardAddBtn'
import Column from './BoardColumn'
import FormAdd from './AppForm'
import { useDispatch, useSelector } from 'react-redux'
import { addColumn } from '../redux/boardSlice'

export default function Board() {
	const [isAddingColumn, setIsAddingColumn] = useState(false)

	const columns = useSelector(state => state.board.columns)
	const dispatch = useDispatch()

	function handleAddColumn(columnName) {
		dispatch(addColumn({ columnName }))
	}
	return (
		<div className="mb-10 flex h-[87%] pl-8">
			<div className="flex h-full flex-row gap-4 overflow-x-auto py-8 pl-2 pr-36 scrollbar scrollbar-track-[#9C446E] scrollbar-thumb-[#ce94b0]">
				{columns.map((column, index) => (
					<div key={column.id} className="w-80 flex-shrink-0">
						<Column column={column} columnIndex={index} />
					</div>
				))}

				<div className="w-80 shrink-0 self-start">
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
		</div>
	)
}
