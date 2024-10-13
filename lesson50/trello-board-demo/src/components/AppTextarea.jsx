/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'

function AppTextarea({ className, ...rest }, ref) {
	const localRef = useRef()

	useEffect(() => {
		const el = localRef.current

		function autoReize() {
			el.style.height = 'auto'
			el.style.height = el.scrollHeight + 'px'
		}
		autoReize()
		el.addEventListener('input', autoReize)
		return () => {
			el.removeEventListener('input', autoReize)
		}
	}, [])

	return (
		<textarea
			rows={1}
			ref={el => {
				if (ref) {
					ref.current = el
				}
				localRef.current = el
			}}
			{...rest}
			className={`w-full cursor-pointer resize-none rounded-lg focus:cursor-text focus:bg-white focus:shadow-blue focus:outline-none ${className}`}
		></textarea>
	)
}

export default React.forwardRef(AppTextarea)
