import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
const variants = {
	primary: {
		color: 'text-white',
		background: 'bg-teal-500',
		hover: 'hover:bg-teal-700',
		shadow: 'shadow-teal-500/30'
	},
	danger: {
		color: 'text-white',
		background: 'bg-red-500',
		hover: 'hover:bg-red-700',
		shadow: 'shadow-red-500/30'
	},

	warning: {
		color: 'text-white',
		background: 'bg-orange-500',
		hover: 'hover:bg-orange-700',
		shadow: 'shadow-orange-500/30'
	},

	success: {
		color: 'text-white',
		background: 'bg-green-500',
		hover: 'hover:bg-green-700',
		shadow: 'shadow-green-500/30'
	},

	text: {
		color: 'text-white',
		hover: 'hover:bg-white/10',
		active: 'active:bg-white/30',
		border: 'border'
	}
}

AppButton.propTypes = {
	children: PropTypes.node,
	variant: PropTypes.string,
	className: PropTypes.string,
	isLoading: PropTypes.bool
}
export default function AppButton({
	variant = 'primary',
	children = 'Submit',
	className = '',
	isLoading = false,
	...rest
}) {
	let variantClass = Object.values(variants[variant] ?? []).join(' ')

	return (
		<>
			<button
				className={`focus:opacity-8 active:opacity-8 relative select-none rounded-md px-4 py-2 align-middle font-bold shadow-sm transition-all hover:shadow-lg focus:shadow-none active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${variantClass} ${className}`}
				{...rest}
				disabled={isLoading}
			>
				{isLoading && (
					<span className="absolute inset-0 flex items-center justify-center">
						<FontAwesomeIcon
							icon={faCircleNotch}
							className="animate-spin text-lg font-bold text-white"
						/>
					</span>
				)}
				{children}
			</button>
		</>
	)
}
