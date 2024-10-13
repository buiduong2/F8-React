/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import AppButton from './AppButton'
import AppTextarea from './AppTextarea'

export default function FormAdd({ onSubmit, onClose, title, ...rest }) {
	const [value, setValue] = useState(null)
	const form = useRef()
	const textarea = useRef()

	useEffect(() => {
		form.current.focus()
		textarea.current.focus()

		const formEl = form.current
		function handleOnClickOutSide(e) {
			const target = e.target

			if (formEl === target || formEl.contains(target)) {
				return
			}

			formEl.dispatchEvent(
				new Event('submit', { bubbles: true, cancelable: true })
			)
		}

		setTimeout(() => {
			document.addEventListener('click', handleOnClickOutSide)
		}, 100)

		return () => {
			document.removeEventListener('click', handleOnClickOutSide)
		}
	}, [])

	function handleOnSubmit(e) {
		e.preventDefault()
		if (value && value.length !== 0) {
			onSubmit(value)
			setValue(null)
		}
		close()
	}

	function close() {
		onClose()
	}

	function handleOnChange(e) {
		setValue(e.target.value)
	}

	return (
		<form
			tabIndex="1"
			ref={form}
			onSubmit={handleOnSubmit}
			className="w-full rounded-lg bg-slate-200 p-2"
			{...rest}
		>
			<AppTextarea
				editing={true}
				ref={textarea}
				className="p-2"
				placeholder="Mời nhập nội dung"
				onChange={handleOnChange}
				name="value"
			/>
			<div className="mt-2 flex gap-3">
				<AppButton>{title}</AppButton>
				<AppButton
					onClick={close}
					variant="text"
					type="button"
					className="aspect-square !p-2"
				>
					<XMarkIcon className="size-6" />
				</AppButton>
			</div>
		</form>
	)
}
