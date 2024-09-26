import { useState } from 'react'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import useAuthStore from '../store/useAuthStore'

function Login() {
	const [email, setEmail] = useState('buiducduong1@gmail.com')
	const { login } = useAuthStore()

	async function handleSubmit(e) {
		e.preventDefault()
		if (email) {
			await login(email)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex w-full flex-col">
			<h2 className="mb-14 max-w-[400px] text-center text-4xl font-bold text-slate-800">
				Chào mừng bạn đến với Todo{' '}
			</h2>
			<p className="mb-1 text-lg">Tài khoản: </p>
			<AppInput
				className="w-full"
				placeholder="Nhập vào Email để đăng nhập"
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<p className="mb-6 mt-1 text-sm text-slate-400">
				Tài khoản khả dụng: buiducduong1@gmail.com
			</p>
			<AppButton variant="success">Đăng nhập</AppButton>
		</form>
	)
}

export default Login
