import PropTypes from 'prop-types'

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
AppNavTab.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.object,
	onClick: PropTypes.func
}

function AppNavTab({ active = false, children, onClick }) {
	function handleClick(e) {
		e.preventDefault()
		onClick(e)
	}

	return (
		<a
			onClick={handleClick}
			className={`-mb-[1px] block cursor-pointer rounded-t-md border border-transparent p-3 py-4 font-bold text-teal-500 ${hoverClass.join(' ')} ${active && activeClass.join(' ')}`}
		>
			{children}
		</a>
	)
}

export default AppNavTab
