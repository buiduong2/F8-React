import PropsType from 'prop-types'

AppInput.propTypes = {
	className: PropsType.string
}

export default function AppInput({ className = '', ...rest }) {
	return (
		<>
			<input
				className={`w-full rounded border border-gray-500 px-3 py-2 outline-none bg-transparent disabled:border-gray-300  ${className}`}
				{...rest}
			/>
		</>
	)
}
