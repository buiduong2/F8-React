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
		isDragging,
		over,
		active
	} = useSortable({
		id: column.id,
		data: {
			type: 'column',
			columnIndex: columnIndex
		}
	})

	const isOverContainer =
		over &&
		((column.id === over.id && active?.data.current?.type !== 'column') ||
			rowIds.includes(over.id as string))

	const style: React.CSSProperties = {
		transition,
		transform: CSS.Translate.toString(transform),
		opacity: isDragging ? 0.3 : 1
	}

	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className={
				`rounded-lg overflow-hidden border border-gray-400 w-80 shrink-0 touch-auto bg-blue-gray-50 ` +
				`${isOverContainer ? 'bg-blue-gray-100 transition-colors' : ''}`
			}
		>
			<h1 className=" bg-white p-3 font-bold text-lg">{column.name}</h1>
			<SortableContext items={rowIds}>
				<ul className={`p-5 flex flex-col gap-3`}>
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
