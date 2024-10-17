import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import type { Column } from '../Type'
import BoardColumnRow from './BoardColumnRow'
import { CSS } from '@dnd-kit/utilities'
interface Props {
	columnIndex: number
	column: Column
}

export default function BoardColumn(props: Props) {
	const { column, columnIndex } = props

	const rowIds = useMemo<string[]>(
		() => column.rows.map(row => row.id),
		[column]
	)

	const {
		setNodeRef,
		listeners,
		attributes,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: column.id,
		data: {
			type: 'column',
			columnIndex: columnIndex
		}
	})

	const style: React.CSSProperties = {
		transition,
		transform: CSS.Transform.toString(transform),
		opacity: isDragging ? 0.3 : 1
	}

	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className={` flex-grow rounded-lg overflow-hidden border border-gray-400`}
		>
			<h1 className="bg-white p-3 font-bold text-lg">{column.name}</h1>
			<SortableContext items={rowIds}>
				<ul className=" bg-blue-gray-50 p-5 flex flex-col gap-5">
					{column.rows.map((row, index) => (
						<BoardColumnRow
							key={row.id}
							row={row}
							columnIndex={columnIndex}
							rowIndex={index}
						/>
					))}
				</ul>
			</SortableContext>
		</div>
	)
}
