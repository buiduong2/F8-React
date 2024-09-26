import PropTypes from 'prop-types'
import useTabStore from '../store/useTabStore'
import useNotificationStore from '../store/useNotificationStore'

const activeClass = [
	'!border-teal-500',
	'!border-b-transparent',
	'!bg-slate-700',
	'!cursor-auto',
	'!text-teal-300'
]

const hoverClass = [
	'hover:border-teal-500',
	'hover:border-b-transparent',
	'hover:bg-slate-700',
	'hover:text-teal-300'
]
AppTabBtn.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	tabName: PropTypes.string
}

function AppTabBtn({ children, tabName = '' }) {
	const { currentTab, changeTab } = useTabStore()
	const { addNotification } = useNotificationStore()

	const isActive = tabName === currentTab

	function handleClick(e) {
		e.preventDefault()
		if (tabName === currentTab) {
			return
		}

		changeTab(tabName)
		addNotification({
			type: 'info',
			content: 'Chuyển sang chế độ ' + tabName + ' Thành công'
		})
	}

	return (
		<a
			onClick={handleClick}
			className={`-mb-[1px] block cursor-pointer rounded-t-md border border-transparent p-3 py-4 font-bold text-teal-500 ${hoverClass.join(' ')} ${isActive && activeClass.join(' ')}`}
		>
			{children}
		</a>
	)
}

export default AppTabBtn
