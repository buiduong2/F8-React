/* eslint-disable react/prop-types */
const classType = {
	text: `hover:bg-slate-300`,
	filled: `px-3 text-white transition-colors `
}

const classColor = {
	default: '',
	primary: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600',
	danger: 'bg-orange-600 hover:bg-orange-700 shadow-orange-600'
}

export default function AppButton({
	variant = 'filled',
	children,
	color,
	className,
	...rest
}) {
	if (!color && variant === 'filled') {
		color = 'primary'
	}

	return (
		<button
			className={`rounded-lg p-2 ${classType[variant]} ${classColor[color]} ${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}
