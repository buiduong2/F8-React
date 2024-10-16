import { CloudArrowUpIcon, DocumentCheckIcon } from '@heroicons/react/24/solid'
import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStatus } from '../redux/boardSlice'

export default function BoardLoading() {
	const status = useSelector(state => state.board.status)
	const dispath = useDispatch()
	const text = useMemo(() => {
		if (status === 'saving') {
			return (
				<>
					<CloudArrowUpIcon className="size-8" /> Đang lưu dữ liệu
				</>
			)
		} else if (status === 'saved') {
			return (
				<>
					<DocumentCheckIcon className="size-8" /> Lưu dữ liệu thành
					công
				</>
			)
		}

		return <></>
	}, [status])

	const ref = useRef()

	useEffect(() => {
		let tween

		if (status === 'saving') {
			tween = gsap.to(ref.current, {
				opacity: 0.2,
				duration: 1,
				repeat: -1,
				yoyo: true
			})
		} else if (status === 'saved') {
			tween = gsap.fromTo(
				ref.current,
				{
					opacity: 1
				},
				{
					opacity: 0,
					duration: 1,
					delay: 1,
					onComplete: () => dispath(setStatus({ status: 'ilde' }))
				}
			)
		}

		return () => tween?.kill()
	}, [status])

	return (
		<>
			<div className="fixed bottom-20 right-10 text-xl text-white">
				<div className="flex items-center gap-5" ref={ref}>
					{status !== 'idle' && text}
				</div>
			</div>
		</>
	)
}
