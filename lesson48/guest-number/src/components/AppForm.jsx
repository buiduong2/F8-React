/* eslint-disable react/prop-types */
import { Input, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { isGuestValid } from '../utils/gameUtils'

function AppForm({ submit, maxNumber }) {
	const [value, setValue] = useState('')
	const [placeHolder, setPlaceHolder] = useState('Hãy thử nhập một số')
	const inputRef = useRef()

	useEffect(() => {
		function handleKeyPress(e) {
			const key = e.key
			const isInputActived = document.activeElement === inputRef.current
			if (key.match(/[0-9]/) && !isInputActived) {
				inputRef.current.focus()
			} else if (['ArrowDown', 'ArrowUp'].includes(key)) {
				e.preventDefault()
				setValue(prev => {
					if (typeof prev === 'string') {
						return 1
					} else {
						const newNumber =
							key === 'ArrowUp' ? prev + 1 : prev - 1
						if (isGuestValid(newNumber, maxNumber)) {
							return newNumber
						} else {
							return prev
						}
					}
				})
				inputRef.current.focus()
			}
		}

		window.addEventListener('keydown', handleKeyPress)

		return () => window.removeEventListener('keydown', handleKeyPress)
	}, [maxNumber])

	function handleOnSubmit(e) {
		e.preventDefault()
		submit(value)
		setPlaceHolder(value)
	}

	function handleOnChangeInput(e) {
		const number = e.target.value

		if (isGuestValid(number, maxNumber)) {
			setValue(number.length === 0 ? '' : Number(number))
		}
	}
	return (
		<form onSubmit={handleOnSubmit}>
			<Text
				size="md"
				fontWeight="medium"
				color="teal.500"
				mb="2"
				as="label"
				htmlFor="number"
				display="block"
			>
				Hãy thử nhập một số
			</Text>
			<Input
				ref={inputRef}
				type="number"
				name="number"
				autoComplete="off"
				autoCorrect="off"
				value={value}
				onChange={handleOnChangeInput}
				placeholder={placeHolder}
				mb="5"
			/>
		</form>
	)
}

export default React.memo(AppForm)
