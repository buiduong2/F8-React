import AppButton from '../components/AppButton'

import PropTypes from 'prop-types'
import AppNavTab from '../components/AppNavTab'

LayoutDefault.propTypes = {
	children: PropTypes.object
}

export default function LayoutDefault({ children }) {
	return (
		<div className="min-h-screen bg-slate-700 pb-3">
			<div className="mx-auto max-w-xl">
				<header className="mb-5 py-3">
					<nav className="flex items-center justify-between border-b border-teal-500 text-white">
						<ul className="flex">
							<li>
								<AppNavTab active={true}>Todo List</AppNavTab>
							</li>
							<li>
								<AppNavTab>Search Todo</AppNavTab>
							</li>
						</ul>

						<div className="">
							<AppButton variant="warning">Logout</AppButton>
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
