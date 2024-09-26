import PropTypes from 'prop-types'
import { useState } from 'react'
import useNotificationStore from '../store/useNotificationStore'
import AppButton from './AppButton'
import AppInput from './AppInput'
TodoForm.propTypes = {
	onSubmit: PropTypes.func,
	type: PropTypes.string,
	onUpdateValue: PropTypes.func
}
function TodoForm({ onSubmit, onUpdateValue, type, ...rest }) {
	const { addNotification } = useNotificationStore()
	const [isLoading, setIsLoading] = useState(false)

	const formType = {
		add: {
			btnLabel: 'Thêm mới',
			placeholder: 'Nhập nội vào dung todo'
		},

		search: {
			btnLabel: 'Tìm kiếm',
			placeholder: 'Nhập từ khóa để tìm kiếm'
		}
	}[type]

	async function handlSubmit(e) {
		e.preventDefault()
		if (isLoading) return
		const inputEl = e.currentTarget.querySelector('input[name=todo]')
		const content = inputEl.value
		if (!content.length && type === 'add') {
			addNotification({
				content: 'Nội dung không được để trống',
				type: 'warning'
			})
			return
		}
		try {
			setIsLoading(true)
			await onSubmit(content)
			if (type === 'add') {
				inputEl.value = ''
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handlSubmit} {...rest}>
			<div className="flex gap-5 border-b border-solid border-teal-500 pb-2">
				<AppInput
					placeholder={formType.placeholder}
					onChange={e => onUpdateValue(e.target.value)}
					autoComplete="off"
					name="todo"
					className="border-0 text-white"
				/>
				<AppButton
					className="shrink-0"
					variant="primary"
					isLoading={isLoading}
				>
					{formType.btnLabel}
				</AppButton>
			</div>
		</form>
	)
}

export default TodoForm
