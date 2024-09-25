import PropTypes from 'prop-types'
import { useState } from 'react'
import useNotification from '../hooks/useNotification'
import AppButton from './AppButton'
import AppInput from './AppInput'
TodoForm.propTypes = {
	onSubmit: PropTypes.func
}
function TodoForm({ onSubmit, ...rest }) {
	const { addNotification } = useNotification()
	const [isLoading, setIsLoading] = useState(false)

	async function handlSubmit(e) {
		e.preventDefault()
		if (isLoading) return
		const inputEl = e.currentTarget.querySelector('input[name=todo]')
		const content = inputEl.value
		if (!content.length) {
			addNotification({
				content: 'Nội dung không được để trống',
				type: 'warning'
			})
			return
		}
		try {
			setIsLoading(true)
			await onSubmit(content)
			inputEl.value = ''
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handlSubmit} {...rest}>
			<div className="flex gap-5 border-b border-solid border-teal-500 pb-2">
				<AppInput
					placeholder="Thêm một công việc mới"
					name="todo"
					className="border-0 text-white"
				/>
				<AppButton
					className="shrink-0"
					variant="primary"
					isLoading={isLoading}
				>
					Thêm mới
				</AppButton>
			</div>
		</form>
	)
}

export default TodoForm
