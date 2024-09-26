import { createContext, useContext } from 'react'
import { setAddNotificationFn } from '../utils/index'
let count = 1

export const NotificationContext = createContext([])

export default function useNotificationStore() {
	const { notifications, setNotifications } = useContext(NotificationContext)
	setAddNotificationFn(addNotification)

	function addNotification(notification) {
		const id = String(++count)
		notification._id = id

		setNotifications(prevNotifications => [
			...prevNotifications,
			notification
		])
	}

	function deleteNotification(id) {
		setNotifications(prevNotificaitons =>
			prevNotificaitons.filter(noti => noti._id != id)
		)
	}

	return {
		notifications,
		addNotification,
		deleteNotification
	}
}
