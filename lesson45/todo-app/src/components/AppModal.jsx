/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect } from 'react'

AppModal.propTypes = {
	closeModal: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node)
	])
}
export default function AppModal({ closeModal, children }) {
	function handleOnClickOverlay(e) {
		if (e.currentTarget !== e.target) return
		closeModal()
	}

	useEffect(() => {
		function handleOnKeyUp(e) {
			if (e.key === 'Escape') {
				closeModal()
			}
		}
		window.addEventListener('keyup', handleOnKeyUp)
		return () => window.removeEventListener('keyup', handleOnKeyUp)
	}, [])

	return (
		<div className="fixed inset-0 z-50">
			<div
				className="absolute inset-0 bg-slate-800/30"
				onClick={handleOnClickOverlay}
			></div>
			<div className="absolute left-1/2 top-1/2 flex max-h-max min-h-[400px] min-w-[400px] max-w-xl -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white p-10 shadow">
				<button
					onClick={closeModal}
					className="absolute right-2 top-2 p-2 text-black transition-colors hover:bg-slate-100"
				>
					&#10006;
				</button>
				{children}
			</div>
		</div>
	)
}
