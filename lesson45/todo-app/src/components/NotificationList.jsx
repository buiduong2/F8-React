import PropTypes from 'prop-types'
import NotificationListItem from './NotificationListItem'
import useNotificationStore from '../store/useNotificationStore'

NotificationList.propTypes = {
	notifications: PropTypes.array,
	onDeleteItem: PropTypes.func
}

function NotificationList() {
	const { notifications, deleteNotification } = useNotificationStore()

	return (
		<ul className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-4 transition-all">
			{notifications.map(item => (
				<NotificationListItem
					key={item._id}
					data={item}
					onDelete={deleteNotification}
					onClick={item.onClick}
				/>
			))}
		</ul>
	)
}

export default NotificationList
