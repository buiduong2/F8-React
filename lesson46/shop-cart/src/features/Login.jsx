import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Typography
} from '@material-tailwind/react'
import { AuthContext } from '../App'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'

function Login() {
	const { login: loginAuth } = useContext(AuthContext)
	const [loadingLogin, setLoadingLogin] = useState(false)

	async function handleOnSubmit(e) {
		e.preventDefault()
		setLoadingLogin(true)
		try {
			const email = e.target['email'].value
			if (email) {
				await loginAuth(email)
			} else {
				toast.warning('Email không được để trống')
			}
		} finally {
			setLoadingLogin(false)
		}
	}

	return (
		<section className="flex justify-center items-center min-w-full min-h-screen">
			<Card
				shadow={false}
				className="md:px-24 md:py-14 py-8 border border-gray-300 max-w-lg"
			>
				<CardHeader
					shadow={false}
					floated={false}
					className="text-center"
				>
					<Typography
						variant="h1"
						color="blue-gray"
						className="mb-4 !text-3xl lg:text-4xl"
					>
						Chào mừng đến với Shopee Cart
					</Typography>
					<Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
						Vẻ đẹp điệu đàng đến từ thời trang
					</Typography>
				</CardHeader>
				<CardBody>
					<form
						method="POST"
						className="flex flex-col gap-4 md:mt-3"
						onSubmit={handleOnSubmit}
					>
						<div>
							<label htmlFor="email">
								<Typography
									variant="small"
									color="blue-gray"
									className="block font-medium mb-2"
								>
									Email của bạn:
								</Typography>
							</label>
							<Input
								id="email"
								color="gray"
								size="lg"
								type="email"
								name="email"
								placeholder="name@mail.com"
								className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
								labelProps={{
									className: 'hidden'
								}}
							/>
						</div>
						<Button
							size="lg"
							color="gray"
							fullWidth
							type="submit"
							loading={loadingLogin}
						>
							Đăng nhập
						</Button>
					</form>
				</CardBody>
			</Card>
		</section>
	)
}

Login.propTypes = {}

export default Login
