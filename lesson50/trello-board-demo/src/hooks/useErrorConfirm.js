import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useConfirm from '../providers/useConfirm'
import { rejectError, resolveError } from '../redux/errorSlice'

export default function useErrorCofirm() {
	const error = useSelector(state => state.error)
	const { openConfirm } = useConfirm()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (error.message) {
			openConfirm({
				label: error.message,
				onSubmit: () => dispatch(resolveError({ navigate, ...error })),
				onCancel: () => dispatch(rejectError({ navigate, ...error }))
			})
		}
	}, [error])
}
