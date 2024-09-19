import PropTypes from 'prop-types'
import AppInput from './AppInput'
import AppButton from './AppButton'
import { useState } from 'react'
TodoForm.propTypes = {
	onSubmit: PropTypes.func,
	addNotification: PropTypes.func
}
function TodoForm({ onSubmit, addNotification, ...rest }) {
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
