import { useState } from 'react'
import NotificationList from './components/NotificationList'
import { NotificationContext } from './hooks/useNotification'
import Todo from './feat/Todo'
import LayoutDefault from './layout/LayoutDefault'

function App() {
	const [notifications, setNotifications] = useState([])

	return (
		<NotificationContext.Provider
			value={{ notifications, setNotifications }}
		>
			<LayoutDefault>

				<NotificationList />
				<Todo />
			</LayoutDefault>
		</NotificationContext.Provider>
	)
}

export default App
