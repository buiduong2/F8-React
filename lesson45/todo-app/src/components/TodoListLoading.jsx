import AppButton from './AppButton'
import AppInput from './AppInput'

export default function TodoListLoading() {
	return (
		<div
			className={`relative mb-5 animate-pulse rounded-md bg-white px-8 py-6 shadow-md shadow-teal-500/30`}
		>
			<div className="mb-3">
				<AppInput name="todo" className='bg-slate-300' />
			</div>

			<div className="flex gap-2">
				<AppButton className="text-transparent">Sửa</AppButton>
				<AppButton className="text-transparent">Xóa</AppButton>
			</div>
		</div>
	)
}
