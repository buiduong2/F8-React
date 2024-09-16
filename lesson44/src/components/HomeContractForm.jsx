import {
	Button,
	Input,
	Radio,
	Textarea,
	Typography
} from '@material-tailwind/react'
import PropTypes from 'prop-types'

HomeContractForm.propTypes = {
	jobs: PropTypes.arrayOf(PropTypes.object)
}
export default function HomeContractForm({ jobs }) {
	return (
		<form action="POST" className="px-5 py-5 lg:px-10">
			<div className="mb-8 flex flex-col gap-4 lg:flex-row">
				<Input
					variant="static"
					label="First Name"
					placeholder="eg.Lucas"
					name="firstName"
					className="lg:w-1/2"
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
				<Button className="w-full md:w-auto">SEND MESSAGE</Button>
			</div>
		</form>
	)
}
