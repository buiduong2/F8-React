import { ArrowRightIcon } from '@heroicons/react/24/solid'
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Typography
} from '@material-tailwind/react'
import PropTypes from 'prop-types'

HomeResume.propTypes = {
	certs: PropTypes.arrayOf(PropTypes.object)
}

export default function HomeResume({ certs }) {
	return (
		<section className="mx-8 my-24">
			<div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-2">
				<div>
					<Typography variant="h2" className="mb-3">
						My Resume
					</Typography>
					<Typography color="gray" className="mb-4 w-3/4">
						Highly skilled and creative Web Developer with 5+ years
						of experience in crafting visually stunning and
						functionally robust websites and web applications.
					</Typography>

					<Button variant="text" className="flex gap-2">
						VIEW MORE <ArrowRightIcon className="size-4" />
					</Button>
				</div>

				<div>
					<div className="flex flex-col gap-6 lg:items-center">
						{certs.map(cert => (
							<Card
								key={cert.id}
								className="w-4/5 flex-row justify-start"
								shadow={false}
							>
								<CardHeader className="mt-0 flex size-12 shrink-0 items-center justify-center bg-black">
									{cert.icon.render({
										className: 'size-6 text-white'
									})}
								</CardHeader>
								<CardBody className="p-0">
									<Typography as="span" color="gray">
										{cert.label}
									</Typography>
								</CardBody>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
