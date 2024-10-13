import { useEffect, useRef } from 'react'
import SortableMin from 'sortablejs'

export default function useSortable(groupName, onEndFn) {
	const ref = useRef()

	useEffect(() => {
		const sortable = new SortableMin(ref.current, {
			group: groupName,
			handle: '.draggable',
			ghostClass: groupName + '-ghost',
			animation: 150,
			onEnd: function (evt) {
				evt.from.insertBefore(evt.item, evt.from.children[evt.oldIndex])

				onEndFn(evt)
			}
		})
		return () => sortable.destroy()
	}, [groupName, onEndFn])

	return ref
}
