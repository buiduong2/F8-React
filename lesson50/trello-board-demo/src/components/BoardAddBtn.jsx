import { PlusIcon } from '@heroicons/react/24/solid'

export default function BoardAddColumnBtn({ ...rest }) {
	return (
		<button
			{...rest}
			className="flex w-full gap-4 rounded-lg bg-white/40 p-3 text-white transition-colors hover:bg-white/50"
		>
			<PlusIcon className="size-6" />
			<span>Thêm danh sách khác</span>
		</button>
	)
}
