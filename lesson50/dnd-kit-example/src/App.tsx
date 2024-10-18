import {
	closestCorners,
	CollisionDetection,
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	MouseSensor,
	rectIntersection,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import {
	arraySwap,
	SortableContext,
	sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { Column, Row } from './Type'
import BoardAddBtn from './components/BoardAddBtn'
import BoardColumn from './components/BoardColumn'
import BoardColumnRow from './components/BoardColumnRow'
import BoardDeleteBtn from './components/BoardDeleteBtn'

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
		},
		{
			id: 'D',
			name: 'Column D',
			rows: [
				{ id: 'D1', name: 'D1' },
				{ id: 'D2', name: 'D2' },
				{ id: 'D3', name: 'D3' }
			]
		}
	])

	const [activeColumn, setActiveColumn] = useState<Column | null>(null)
	const [activeRow, setActiveRow] = useState<Row | null>(null)

	const columnIds = useMemo<string[]>(
		() => columns.map(col => col.id),
		[columns]
	)

	const customCollisionDetection = useMemo<CollisionDetection>(
		() => args => {
			if (args.active.data.current?.type === 'column') {
				return rectIntersection(args)
			} else {
				return closestCorners(args)
			}
		},
		[]
	)

	const keyboardSensor = useSensor(KeyboardSensor, {
		coordinateGetter: sortableKeyboardCoordinates
	})
	const mouseSensor = useSensor(MouseSensor)
	const touchSensor = useSensor(TouchSensor)
	const sensors = useSensors(keyboardSensor, mouseSensor, touchSensor)

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleOnDragStart}
			onDragEnd={handleOnDragEnd}
			onDragOver={handleOnDragOver}
			collisionDetection={customCollisionDetection}
		>
			<div className="bg-blue-gray-50 h-screen min-w-full w-fit px-20 pt-20">
				<div className="flex items-start gap-10">
					<SortableContext items={columnIds}>
						{columns.map((col, index) => (
							<BoardColumn
								key={col.id}
								column={col}
								columnIndex={index}
							/>
						))}
					</SortableContext>
					<div className="self-stretch shrink-0 w-80 max-h-80 ">
						<BoardAddBtn handleClickAddBtn={handleClickAddBtn} />
					</div>
					<div>
						{Boolean(activeColumn || activeRow) && (
							<BoardDeleteBtn />
						)}
					</div>
				</div>
			</div>

			{activeColumn && (
				<DragOverlay>
					<div className="">
						<BoardColumn column={activeColumn} columnIndex={0} />
					</div>
				</DragOverlay>
			)}
			{activeRow && (
				<DragOverlay className="list-none">
					<BoardColumnRow
						row={activeRow}
						rowIndex={0}
						columnIndex={0}
					/>
				</DragOverlay>
			)}
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
		if (toType === 'addBtn' || toType === 'deleteBtn') {
			return
		}

		if (fromType === 'row') {
			moveRow({
				fromColumnIndex,
				fromRowIndex,
				toColumnIndex,
				toRowIndex
			})
		}
	}

	function handleOnDragEnd(evt: DragEndEvent) {
		setActiveColumn(null)
		setActiveRow(null)
		const { active, over } = evt
		if (!over) return

		const {
			columnIndex: fromColumnIndex,
			rowIndex: fromRowIndex,
			type: fromType
		} = active.data.current!

		const { columnIndex: toColumnIndex, rowIndex: toRowIndex } =
			over.data.current!

		if (over.data.current?.type === 'addBtn') {
			if (fromType === 'row') {
				setColumns(prev => {
					const newCol = createNewColumn(prev)
					const row = prev[fromColumnIndex].rows.splice(
						fromRowIndex,
						1
					)[0]
					newCol.rows.push(row)
					return [...prev, newCol]
				})
			}
			return
		} else if (over.data.current?.type === 'deleteBtn') {
			if (fromType === 'column') {
				deleteColumn(fromColumnIndex)
			} else if (fromType === 'row') {
				deleteRow(fromColumnIndex, fromRowIndex)
			}
			return
		}
		if (fromType === 'column') {
			moveColumn({ fromColumnIndex, toColumnIndex })
		} else if (fromType === 'row') {
			moveRow({
				fromColumnIndex,
				fromRowIndex,
				toColumnIndex,
				toRowIndex
			})
		}
	}

	function handleClickAddBtn() {
		addColumn()
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
			return arraySwap(prev, fromColumnIndex, toColumnIndex)
		})
	}

	function addColumn() {
		setColumns(cols => {
			const column = createNewColumn(cols)
			return [...cols, column]
		})
	}

	function createNewColumn(cols: Column[]): Column {
		const lastId = cols[cols.length - 1].id || 'A'
		const nextId = String.fromCharCode(lastId.charCodeAt(0) + 1)
		return { id: nextId, name: 'Column ' + nextId, rows: [] }
	}

	function deleteColumn(columnIndex: number) {
		setColumns(prev => prev.filter((_col, index) => index !== columnIndex))
	}

	function deleteRow(columnIndex: number, rowIndex: number) {
		setColumns(prev =>
			prev.map((col, index) => {
				if (index === columnIndex) {
					return {
						...col,
						rows: col.rows.filter(
							(_row, rIndex) => rIndex !== rowIndex
						)
					}
				}
				return col
			})
		)
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
