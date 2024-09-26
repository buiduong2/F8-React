import AppButton from '../components/AppButton'

import PropTypes from 'prop-types'
import AppTabBtn from '../components/AppTabBtn'
import useAuthStore from '../store/useAuthStore'

LayoutDefault.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
}

export default function LayoutDefault({ children }) {
	const { logout, isAuthenticated } = useAuthStore()

	return (
		<div className="min-h-screen bg-slate-700 pb-3">
			<div className="mx-auto max-w-xl">
				<header className="mb-5 py-3">
					<nav className="flex items-center justify-between border-b border-teal-500 text-white">
						<ul className="flex">
							<li>
								<AppTabBtn tabName="TodoList">
									Todo List
								</AppTabBtn>
							</li>
							<li>
								<AppTabBtn tabName="TodoSearch">
									Search Todo
								</AppTabBtn>
							</li>
						</ul>

						<div>
							{isAuthenticated() && (
								<AppButton variant="warning" onClick={logout}>
									Logout
								</AppButton>
							)}
						</div>
					</nav>
				</header>
				<h1 className="mb-5 text-center text-xl font-semibold text-white">
					Welcome to Todo App
				</h1>
				{children}
			</div>
		</div>
	)
}
