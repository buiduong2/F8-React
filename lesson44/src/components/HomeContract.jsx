import { Typography } from '@material-tailwind/react'
import PropTypes from 'prop-types'
import HomeContractForm from './HomeContractForm'

HomeContract.propTypes = {
	contracts: PropTypes.arrayOf(PropTypes.object),
	formJobs: PropTypes.arrayOf(PropTypes.object)
}

export default function HomeContract({ contracts, formJobs }) {
	return (
		<section className="px-8 py-16">
			<div className="flex flex-col items-center text-center">
				<Typography variant="h1" color="blue-gray" className="mb-4">
					Contact Us
				</Typography>
				<Typography
					variant="lead"
					color="gray"
					className="mb-20 lg:w-5/12"
				>
					Ready to get started? Feel free to reach out through the
					contact form, and let&rsquo;s embark on a journey of
					innovation and success.
				</Typography>
			</div>

			<div className="container mx-auto grid grid-cols-1 gap-10 rounded-lg p-6 shadow-lg lg:grid-cols-12">
				<div className="rounded-lg bg-gray-900 p-5 md:p-16 lg:col-span-5">
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
					<ul className="flex flex-col gap-4">
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
					</ul>
				</div>
				<div className="lg:col-span-7">
					<HomeContractForm jobs={formJobs} />
				</div>
			</div>
		</section>
	)
}
