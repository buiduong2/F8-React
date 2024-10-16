import { Form, Outlet, useLocation } from 'react-router-dom'

import AppButton from './components/AppButton.jsx'

function App() {
	const location = useLocation()
	return (
		<div className="h-full bg-pink-550">
			<header className="relative flex h-[10%] items-center justify-center border-b border-b-slate-300 bg-pink-800/50 p-6 text-lg font-bold text-white">
				<h1>MY TODO</h1>
				{location.pathname !== '/login' && (
					<Form
						className="absolute right-20"
						action="/logout"
						method="POST"
					>
						<AppButton>Đăng xuất</AppButton>
					</Form>
				)}
			</header>
			<Outlet />
		</div>
	)
}

export default App
