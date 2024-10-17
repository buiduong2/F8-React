import { useSortable } from '@dnd-kit/sortable'
import type { Row } from '../Type'
import { CSS } from '@dnd-kit/utilities'

interface Props {
	columnIndex: number
	rowIndex: number
	row: Row
}

export default function BoardColumnRow(props: Props) {
	const { row, columnIndex, rowIndex } = props

	let borderClass
	if (row.id[0] === 'A') {
		borderClass = 'border-l-blue-300'
	} else if (row.id[0] === 'B') {
		borderClass = 'border-l-yellow-300'
	} else {
		borderClass = 'border-l-red-300'
	}

	const {
		setNodeRef,
		listeners,
		attributes,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: row.id,
		data: {
			type: 'row',
			columnIndex,
			rowIndex,
		}
	})

	const style: React.CSSProperties = {
		transition,
		transform: CSS.Transform.toString(transform),
		opacity: isDragging ? 0.3 : 1
	}

	return (
		<li
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className={`border-l-4  bg-white p-3 border border-gray-400 rounded ${borderClass}`}
		>
			{row.name}
		</li>
	)
}
