import { CloudArrowUpIcon, DocumentCheckIcon } from '@heroicons/react/24/solid'
import gsap from 'gsap'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function BoardLoading() {
	const status = useSelector(state => state.board.status)
	const [currentStatus, setCurrentStatus] = useState(status)
	const text = useMemo(() => {
		if (currentStatus === 'loading') {
			return (
				<>
					<CloudArrowUpIcon className="size-8" /> Đang lưu dữ liệu
				</>
			)
		} else if (currentStatus === 'loaded') {
			return (
				<>
					<DocumentCheckIcon className="size-8" /> Lưu dữ liệu thành
					công
				</>
			)
		}

		return <div>Trống không</div>
	}, [currentStatus])

	const ref = useRef()

	useEffect(() => {
		let tween

		if (status === 'loading') {
			setCurrentStatus('loading')
			tween = gsap.to(ref.current, {
				opacity: 0.2,
				duration: 1,
				repeat: -1,
				yoyo: true
			})
		} else if (status === 'idle') {
			if (currentStatus === 'loaded') {
				tween = gsap.fromTo(
					ref.current,
					{
						opacity: 1
					},
					{
						opacity: 0,
						duration: 1,
						delay: 1,
						onComplete: () => setCurrentStatus('idle')
					}
				)
			} else if (currentStatus === 'loading') {
				setCurrentStatus('loaded')
			}
		}

		return () => tween?.kill()
	}, [status, currentStatus])

	return (
		<>
			(
			<div className="fixed bottom-20 right-10 text-xl text-white">
				<div className="flex items-center gap-5" ref={ref}>
					{currentStatus !== 'idle' && text}
				</div>
			</div>
			)
		</>
	)
}
