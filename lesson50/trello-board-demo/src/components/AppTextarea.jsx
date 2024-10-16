/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'

function AppTextarea({ className, editing = false, ...rest }, ref) {
	const [isEditing, setIsEditing] = useState(editing)
	const localRef = useRef()
	if (!editing) {
		const otherBlur = rest.onBlur
		rest.onBlur = e => {
			otherBlur?.(e)
			setIsEditing(false)
		}
	}

	useEffect(() => {
		if (isEditing && !editing) {
			const el = localRef.current
			el.focus()
			el.select();

			function autoReize() {
				el.style.height = 'auto'
				el.style.height = el.scrollHeight + 'px'
			}
			autoReize()
			el.addEventListener('input', autoReize)

			return () => el.removeEventListener('input', autoReize)
		}
	}, [isEditing])

	return (
		<>
			{!isEditing ? (
				<h3
					{...rest}
					className={`w-full cursor-pointer rounded-lg ${className}`}
					onClick={() => setIsEditing(true)}
				>
					{rest.value || rest.defaultValue}
				</h3>
			) : (
				<textarea
					rows={2}
					ref={el => {
						if (ref) {
							ref.current = el
						}
						localRef.current = el
					}}
					{...rest}
					className={`w-full cursor-pointer resize-none rounded-lg outline-none focus:cursor-text focus:bg-white focus:shadow-blue ${className}`}
				></textarea>
			)}
		</>
	)
}

export default React.forwardRef(AppTextarea)
