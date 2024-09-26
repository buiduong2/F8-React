/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { NotificationContext } from './store/useNotificationStore'
import useTabStore, { TabContext } from './store/useTabStore'
import useAuthStore, { AuthContext } from './store/useAuthStore'
import Todo from './feat/Todo'
import Login from './feat/Login'
import LayoutDefault from './layout/LayoutDefault'
import AppModal from './components/AppModal'
import NotificationList from './components/NotificationList'

function App() {
	const [notifications, setNotifications] = useState([])
	const [currentTab, setCurrentTab] = useState('TodoList')
	const [authInfo, setAuthInfo] = useState(
		localStorage.getItem('AUTH_INFO') || null
	)

	return (
		<AuthContext.Provider value={{ authInfo, setAuthInfo }}>
			<TabContext.Provider value={{ currentTab, setCurrentTab }}>
				<NotificationContext.Provider
					value={{ notifications, setNotifications }}
				>
					<AppInner />
				</NotificationContext.Provider>
			</TabContext.Provider>
		</AuthContext.Provider>
	)
}

function AppInner() {
	const { isAuthenticated, init: authInit } = useAuthStore()

	useEffect(() => {
		authInit()
	}, [])

	const [activeModal, setActiveModal] = useState(!isAuthenticated())
	const { currentTab } = useTabStore()

	function handleClick(e) {
		e.preventDefault()
		setActiveModal(true)
	}

	return (
		<LayoutDefault>
			{activeModal && !isAuthenticated() && (
				<AppModal closeModal={() => setActiveModal(false)}>
					<Login />
				</AppModal>
			)}
			{isAuthenticated() ? (
				<Todo key={currentTab} />
			) : (
				<p className="mt-10 text-center text-xl text-white">
					Bạn chưa đăng nhập? <br />
					<a
						href="#"
						onClick={handleClick}
						className="text-teal-500 underline"
					>
						Đăng nhập ngay !
					</a>
				</p>
			)}
			<NotificationList />
		</LayoutDefault>
	)
}

export default App
