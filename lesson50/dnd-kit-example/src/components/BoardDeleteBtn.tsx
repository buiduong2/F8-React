import { useDroppable } from '@dnd-kit/core'

export default function BoardDeleteBtn() {
	const { isOver, setNodeRef } = useDroppable({
		id: 'delete-btn',
		data: {
			type: 'deleteBtn'
		}
	})
	return (
		<div
			ref={setNodeRef}
			className={
				`fixed pointer-events-auto bottom-7 left-1/2 -translate-x-1/2 transition-all w-40 h-20 bg-blue-gray-100 flex items-center justify-center` +
				` ${isOver ? '!bg-red-200' : ''}`
			}
		>
			DELETE
		</div>
	)
}
