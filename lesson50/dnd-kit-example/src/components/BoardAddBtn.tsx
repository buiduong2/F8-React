import { useDroppable } from '@dnd-kit/core'

interface props {
	handleClickAddBtn: () => void
}

export default function BoardAddBtn({ handleClickAddBtn }: props) {
	const { setNodeRef, isOver, active } = useDroppable({
		id: 'btn',
		data: {
			type: 'addBtn'
		}
	})

	return (
		<button
			ref={setNodeRef}
			onClick={handleClickAddBtn}
			className={
				`w-full h-full bg-blue-gray-100/30   text-black hover:bg-blue-gray-100/80 transition-colors border-blue-gray-200 border hover:border-blue-gray-300 ` +
				`${
					isOver && active?.data.current?.type === 'row'
						? 'bg-blue-gray-100/80 scale-105 transition-transform'
						: ''
				}`
			}
		>
			+ Add Column
		</button>
	)
}
