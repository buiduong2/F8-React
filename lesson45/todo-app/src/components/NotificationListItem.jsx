/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faInfo,
	faCheck,
	faXmark,
	faExclamation
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

NotificationListItem.propTypes = {
	data: PropTypes.object,
	variant: PropTypes.string,
	liveTime: PropTypes.number,
	onClick: PropTypes.func,
	onDelete: PropTypes.func
}

const notificationType = {
	success: {
		title: 'Thành Công',
		icon: faCheck,
		color: {
			background: 'bg-green-500',
			border: 'border-l-green-500'
		}
	},
	error: {
		title: 'Thất bại',
		icon: faXmark,
		color: {
			background: 'bg-red-500',
			border: 'border-l-red-500'
		}
	},
	warning: {
		title: 'Cảnh báo',
		icon: faExclamation,
		color: {
			background: 'bg-orange-500',
			border: 'border-l-orange-500'
		}
	},
	info: {
		title: 'Thông tin',
		icon: faInfo,
		color: {
			background: 'bg-blue-500',
			border: 'border-l-blue-500'
		}
	}
}

const lifeCycle = {
	CREATED: 1,
	BEFORE_DESTROY: 2,
	DESTROYED: 3
}

function NotificationListItem({ data, onClick, onDelete }) {
	const style = notificationType[data.type] || notificationType['info']
	const liveTime = data.liveTime || 3000

	const [mode, setMode] = useState(lifeCycle.CREATED)

	useEffect(() => {
		let timeoutId
		switch (mode) {
			case lifeCycle.CREATED:
				timeoutId = setTimerToBeforeDestroy()
				break
			case lifeCycle.BEFORE_DESTROY:
				timeoutId = setTimerToDestroyed()
				break
			case lifeCycle.DESTROYED:
				onDelete(data._id)
				data.onDelete?.()
				break
		}

		return () => clearTimeout(timeoutId)
	}, [mode])

	function getElements() {
		const _this = document.querySelector(
			`li[data-class="notification-item"][data-id="${data._id}"]`
		)

		return {
			_this
		}
	}

	function setTimerToBeforeDestroy() {
		return setTimeout(() => {
			setMode(lifeCycle.BEFORE_DESTROY)
		}, liveTime)
	}

	function setTimerToDestroyed() {
		const { _this } = getElements()
		_this.classList.add('animation-side-right-shrink-500')

		return setTimeout(() => {
			setMode(lifeCycle.DESTROYED)
		}, 500)
	}

	function handleClickDeleteBtn(e) {
		e.stopPropagation()
		if (mode !== lifeCycle.CREATED) return
		setMode(lifeCycle.BEFORE_DESTROY)
	}

	function handleOnClickComponent() {
		if (typeof onClick !== 'function') return

		if (mode !== lifeCycle.BEFORE_DESTROY) {
			setMode(lifeCycle.BEFORE_DESTROY)
		}
		onClick()
	}

	return (
		<li
			data-class="notification-item"
			data-id={data._id}
			onClick={handleOnClickComponent}
			className={`${onClick && 'cursor-pointer'} animation-slide-left-500 relative flex items-center justify-between gap-3 rounded-l-md border-l-8 bg-white pl-5 ${style.color.border}`}
		>
			<FontAwesomeIcon
				icon={style.icon}
				className={`item-center flex size-5 shrink-0 justify-center rounded-full p-1 text-white ${style.color.background}`}
			/>
			<div className="grow py-3">
				<h2 className="mb-1 text-sm font-bold">{style.title}</h2>
				<p>{data.content}</p>
				{data.info && <p className="text-black/80">{data.info}</p>}
			</div>

			<button
				className="shrink-0 self-stretch px-5 py-3 opacity-60 hover:opacity-100"
				onClick={handleClickDeleteBtn}
			>
				<FontAwesomeIcon icon={faXmark} />
			</button>

			<div
				data-class="progress"
				className={`animation-reduce-width-to-zero absolute bottom-0 left-0 h-1 rounded-r-sm ${style.color.background}`}
				style={{
					animationDuration: liveTime + 'ms'
				}}
			></div>
		</li>
	)
}

export default NotificationListItem
