import { Form, useRouteError } from 'react-router-dom'
import AppButton from '../components/AppButton'

export default function Login() {
	const error = useRouteError()
	return (
		<section>
			<Form
				method="POST"
				className="fixed left-1/2 top-1/2 flex h-80 w-96 -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded bg-white px-10 py-8 shadow-2xl"
			>
				<h1 className="mb-7 text-center text-4xl font-bold">Trello</h1>
				<h2 className="mb-3 text-center text-lg font-semibold">
					Đăng nhhập để tiếp tục
				</h2>
				<div className="mb-3">
					<input
						placeholder="Nhập Email của bạn:"
						className="w-full border p-2"
						defaultValue="buiducduong1@gmail.com"
						type="email"
						name="email"
					/>
					{error && <p className="text-red-600">{error.message}</p>}
				</div>
				<div>
					<AppButton className="w-full rounded-md text-lg">
						Login
					</AppButton>
				</div>
			</Form>
		</section>
	)
}
