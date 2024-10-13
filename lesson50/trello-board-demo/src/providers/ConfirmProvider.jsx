/* eslint-disable react/prop-types */
import {  useRef, useState } from 'react'
import AppConfirm from './AppConfirm'
import { ConfirmContext } from './useConfirm'


export default function ConfirmProvider({ children }) {
	const label = useRef()
	const onSubmit = useRef()
	const onCancel = useRef()

	const [isActive, setIsActive] = useState(false)

	function openConfirm(payload) {
		label.current = payload.label || 'Bạn chắc chứ'
		onSubmit.current = payload.onSubmit
		onCancel.current = payload.onCancel
		setIsActive(true)
	}
	async function cancel() {
		await onCancel.current?.()
		clear()
	}

	async function submit() {
		await onSubmit.current?.()
		clear()
	}

	function clear() {
		onSubmit.current = null
		onCancel.current = null
		setIsActive(false)
	}

	return (
		<ConfirmContext.Provider value={{ openConfirm }}>
			{children}
			{isActive && (
				<AppConfirm
					cancel={cancel}
					submit={submit}
					label={label.current}
				/>
			)}
		</ConfirmContext.Provider>
	)
}
