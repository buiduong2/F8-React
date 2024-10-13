/* eslint-disable react/prop-types */

import { useEffect, useRef } from 'react'
import AppButton from '../components/AppButton'

export default function AppConfirm({ cancel, submit, label }) {
	label = label || 'Hãy xác nhận'
	const container = useRef()

	useEffect(() => {
		const el = container.current

		function clickOutSide(e) {
			const target = e.target
			if (el === target || el.contains(target)) {
				return
			}

			cancel?.()
		}
		function handleEscKey(e) {
			if (e.key === 'Escape') {
				cancel?.()
			}
		}

		setTimeout(() => {
			document.addEventListener('click', clickOutSide)
			document.addEventListener('keyup', handleEscKey)
		}, 100)

		return () => {
			document.removeEventListener('keyup', handleEscKey)
			document.removeEventListener('click', clickOutSide)
		}
	}, [])

	function handleOnSubmit() {
		submit?.()
	}

	function handleOnCancel() {
		cancel?.()
	}

	return (
		<div
			draggable
			className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
			ref={container}
		>
			<div className="w-80 rounded-2xl bg-white p-6 shadow-lg">
				<h3 className="text-xl font-bold">Xác nhận</h3>
				<div className="pb-3 pt-2 text-lg">{label}</div>
				<div className="flex justify-end gap-1 pt-2">
					<AppButton onClick={handleOnSubmit} color="danger">
						Xác nhận
					</AppButton>
					<AppButton onClick={handleOnCancel}>Hủy Bỏ</AppButton>
				</div>
			</div>
		</div>
	)
}
