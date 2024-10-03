import {
	Button,
	Card,
	CardBody,
	Input,
	Textarea,
	Typography
} from '@material-tailwind/react'
import { sendEmail } from '../utils/emailService'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'

export default function FormSendEmail() {
	useEffect(() => {
		toast.info('Login successfully')
	}, [])

	const { user, logout } = useAuth0()

	const [formData, setFormData] = useState({
		...user,
		from_name: user.name,
		to_email: user.email,
		from_email: user.email,
		message: ''
	})

	const [loading, setLoading] = useState(false)

	async function handleOnSubmit(e) {
		e.preventDefault()
		setLoading(true)
		try {
			await sendEmail(formData)
			toast.success('Send Email Successfully')
			e.target.reset()
		} finally {
			setLoading(false)
		}
	}

	function handleOnChangeInput(e) {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	function handleLogout(e) {
		e.preventDefault()
		if (confirm('Are you sure to logout')) {
			logout({
				returnTo: window.location.origin
			})
		}
	}

	return (
		<section className="container mx-auto min-h-screen flex items-center">
			<Card color="transparent" shadow={true} className="min-w-full">
				<CardBody className="p-12">
					<Typography variant="h3" color="blue-gray">
						Send Your Email
					</Typography>
					<form
						data-id="form-send-email"
						className="mt-8 mb-2"
						onSubmit={handleOnSubmit}
					>
						<Typography
							className="mt-5 mb-4"
							variant="h4"
							color="blue-gray"
						>
							From:
						</Typography>

						<div className="ml-5">
							<ul className="list-disc">
								<li>
									<img src={user.picture} />
								</li>
								<li>
									Username: <strong>{user.name}</strong>
								</li>
								<li>
									User Email: <strong>{user.email}</strong>
								</li>
							</ul>
						</div>

						<Typography variant="h4" className="mt-5 mb-4">
							To:{' '}
						</Typography>
						<div className="mb-6 flex flex-col gap-6">
							<Input
								onChange={handleOnChangeInput}
								defaultValue={formData.name}
								label="Your Name"
								name="from_name"
								placeholder="John Doe"
								required
							/>
							<Input
								onChange={handleOnChangeInput}
								defaultValue={formData.email}
								name="to_email"
								size="lg"
								label="Send To"
								placeholder="email@email.com"
								required
							/>
							<Textarea
								onChange={handleOnChangeInput}
								name="message"
								size="lg"
								label="Message"
								required
							/>
						</div>
						<Button type="submit" loading={loading}>
							Gửi Email
						</Button>

						<Button
							type="button"
							color="red"
							className="ml-5"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</form>
				</CardBody>
			</Card>
		</section>
	)
}
