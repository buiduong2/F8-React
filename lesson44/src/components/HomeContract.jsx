import { List, Typography } from '@material-tailwind/react'
import { PhoneIcon, EnvelopeIcon, TicketIcon } from '@heroicons/react/24/solid'
import HomeContractForm from './HomeContractForm'
export default function HomeContract() {
	const contracts = [
		{ id: 1, icon: PhoneIcon, label: '+1(424) 535 3523' },
		{ id: 2, icon: EnvelopeIcon, label: 'hello@mail.com' },
		{ id: 3, icon: TicketIcon, label: 'Open Support Ticket' }
	]

	return (
		<section className="px-8 py-16">
			<div className="flex flex-col items-center text-center">
				<Typography variant="h1" color="blue-gray" className="mb-4">
					Contact Us
				</Typography>
				<Typography
					variant="lead"
					color="gray"
					className="mb-20 w-5/12"
				>
					Ready to get started? Feel free to reach out through the
					contact form, and let&rsquo;s embark on a journey of
					innovation and success.
				</Typography>
			</div>

			<div className="container mx-auto flex gap-10 rounded-lg p-6 shadow-lg">
				<div className="w-5/12 rounded-lg bg-gray-900 p-16">
					<Typography variant="h4" color="white" className="mb-2">
						Contact Information
					</Typography>
					<Typography
						variant="paragraph"
						color="gray"
						className="mb-8"
					>
						Fill up the form and our Team will get back to you
						within 24 hours.
					</Typography>
					<List className="flex flex-col gap-4">
						{contracts.map(contract => (
							<Typography
								key={contract.id}
								as="li"
								variant="h6"
								color="white"
								className="flex items-center gap-5"
							>
								{contract.icon.render({ className: 'size-6' })}
								{contract.label}
							</Typography>
						))}
					</List>
				</div>
				<div className='w-7/12'>
					<HomeContractForm />
				</div>
			</div>
		</section>
	)
}
