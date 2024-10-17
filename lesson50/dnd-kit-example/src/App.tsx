import {
	DndContext,
	DragOverEvent,
	DragOverlay,
	DragStartEvent
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { getEventCoordinates } from '@dnd-kit/utilities'
import { useMemo, useState } from 'react'
import { Column, Row } from './Type'
import BoardColumn from './components/BoardColumn'
import BoardColumnRow from './components/BoardColumnRow'

function App() {
	const [columns, setColumns] = useState<Column[]>([
		{
			id: 'A',
			name: 'Column A',
			rows: [
				{ id: 'A1', name: 'A1' },
				{ id: 'A2', name: 'A2' },
				{ id: 'A3', name: 'A3' }
			]
		},
		{
			id: 'B',
			name: 'Column B',
			rows: [
				{ id: 'B1', name: 'B1' },
				{ id: 'B2', name: 'B2' },
				{ id: 'B3', name: 'B3' }
			]
		},
		{
			id: 'C',
			name: 'Column C',
			rows: [
				{ id: 'C1', name: 'C1' },
				{ id: 'C2', name: 'C2' },
				{ id: 'C3', name: 'C3' }
			]
		}
	])

	const [activeColumn, setActiveColumn] = useState<Column | null>(null)
	const [activeRow, setActiveRow] = useState<Row | null>(null)

	const columnIds = useMemo<string[]>(
		() => columns.map(col => col.id),
		[columns]
	)

	return (
		<DndContext
			onDragStart={handleOnDragStart}
			onDragEnd={handleOnDragEnd}
			onDragOver={handleOnDragOver}
		>
			<div className="bg-blue-gray-50 h-screen w-full">
				<div className="container mx-auto pt-10 flex items-start gap-10">
					<SortableContext items={columnIds}>
						{columns.map((col, index) => (
							<BoardColumn
								key={col.id}
								column={col}
								columnIndex={index}
							/>
						))}
					</SortableContext>
				</div>
				<DragOverlay className="list-none">
					<>
						{activeColumn && (
							<div className="container mx-auto  flex items-start gap-10 w-full">
								<BoardColumn
									column={activeColumn}
									columnIndex={0}
								/>
							</div>
						)}
						{activeRow && (
							<BoardColumnRow
								row={activeRow}
								rowIndex={0}
								columnIndex={0}
							/>
						)}
					</>
				</DragOverlay>
			</div>
		</DndContext>
	)

	function handleOnDragStart(evt: DragStartEvent) {
		const { active } = evt
		const { columnIndex, rowIndex, type } = active.data.current!

		if (type === 'column') {
			setActiveColumn(columns[columnIndex])
		} else if (type === 'row') {
			setActiveRow(columns[columnIndex].rows[rowIndex])
		}
	}

	function handleOnDragOver(evt: DragOverEvent) {
		const { active, over } = evt
		if (!over) return

		const {
			columnIndex: fromColumnIndex,
			rowIndex: fromRowIndex,
			type: fromType
		} = active.data.current!

		const {
			columnIndex: toColumnIndex,
			rowIndex: toRowIndex,
			type: toType
		} = over.data.current!
		if (fromType === 'row') {
			if (toType === 'row') {
				moveRow({
					fromColumnIndex,
					fromRowIndex,
					toColumnIndex,
					toRowIndex
				})
			} else if (toType === 'column') {
				const { y: initialY } = getEventCoordinates(evt.activatorEvent)!
				const movedY = evt.delta.y
				const intersectY = initialY + movedY
				const columnRect = over.rect
				const isIntersectBelow =
					intersectY > columnRect.top + columnRect.height / 2
				if (isIntersectBelow) {
					moveRow({
						fromColumnIndex,
						fromRowIndex,
						toColumnIndex,
						toRowIndex: columns[toColumnIndex].rows.length - 1
					})
				} else {
					moveRow({
						fromColumnIndex,
						fromRowIndex,
						toColumnIndex,
						toRowIndex: 0
					})
				}
			}
		} else if (fromType === 'column' && toType === 'column') {
			moveColumn({ fromColumnIndex, toColumnIndex })
		}
	}

	function handleOnDragEnd() {
		setActiveColumn(null)
		setActiveRow(null)
	}

	function moveRow(moveRowArg: MoveRowArg): void {
		const { fromColumnIndex, fromRowIndex, toColumnIndex, toRowIndex } =
			moveRowArg
		setColumns(prev => {
			const columns = prev.map((col, index) => {
				if (index === toColumnIndex || index === fromColumnIndex) {
					return { ...col, rows: [...col.rows] }
				}
				return col
			})

			const movedRow = columns[fromColumnIndex].rows.splice(
				fromRowIndex,
				1
			)[0]
			columns[toColumnIndex].rows.splice(toRowIndex, 0, movedRow)

			return columns
		})
	}

	function moveColumn(moveColumnArg: MoveColumnArg) {
		const { fromColumnIndex, toColumnIndex } = moveColumnArg
		if (fromColumnIndex === toColumnIndex) return

		setColumns(prev => {
			const newCols = [...prev]
			const col = newCols.splice(fromColumnIndex, 1)[0]
			newCols.splice(toColumnIndex, 0, col)
			return newCols
		})
	}
}

export default App

type MoveRowArg = {
	fromColumnIndex: number
	fromRowIndex: number
	toColumnIndex: number
	toRowIndex: number
}

type MoveColumnArg = {
	fromColumnIndex: number
	toColumnIndex: number
}
