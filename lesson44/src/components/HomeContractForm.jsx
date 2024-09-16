import {
	Button,
	Input,
	Radio,
	Textarea,
	Typography
} from '@material-tailwind/react'

export default function HomeContractForm() {
	const jobs = [
		{
			id: 1,
			label: 'Design',
			value: '1'
		},
		{
			id: 2,
			label: 'Development',
			value: '2'
		},
		{
			id: 3,
			label: 'Support',
			value: '3'
		},
		{
			id: 4,
			label: 'Other',
			value: '0'
		}
	]

	return (
		<form action="POST" className="px-10 py-5">
			<div className="mb-8 flex gap-4">
				<Input
					variant="static"
					label="First Name"
					placeholder="eg.Lucas"
					name="firstName"
					className="w-1/2"
					type="text"
				/>
				<Input
					name="lastName"
					variant="static"
					label="Last Name"
					placeholder="eg.Jone"
					type="text"
				/>
			</div>
			<div className="mb-8">
				<Input
					variant="static"
					label="Email"
					name="email"
					type="email"
					placeholder="eg.lucas@mail.com"
				/>
			</div>
			<div className="mb-14">
				<Typography
					variant="paragraph"
					className="mb-2 text-sm text-blue-gray-500"
				>
					What are you interested on?
				</Typography>

				<div>
					{jobs.map(job => (
						<Radio
							key={job.id}
							name="job"
							value={job.value}
							label={job.label}
						/>
					))}
				</div>
			</div>

			<div className="mb-8">
				<Textarea variant="static" label="Your Message" />
			</div>

			<div className="text-end">
				<Button>SEND MESSAGE</Button>
			</div>
		</form>
	)
}
