import { Typography } from '@material-tailwind/react'
import PropTypes from 'prop-types'

HomeClientListGrayScale.propTypes = {
	logos: PropTypes.arrayOf(PropTypes.string)
}

export default function HomeClientListGrayScale({ logos }) {
	return (
		<section className="px-8 py-20">
			<div className="container mx-auto">
				<div className="mb-8 text-center">
					<Typography variant="h6" color="gray" className="mb-4">
						POPULAR CLIENTS
					</Typography>
					<Typography variant="h2" color="blue-gray">
						Trusted by over 10,000+ <br /> clients
					</Typography>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-6 grayscale">
					{logos.map((logo, index) => (
						<div key={index} className="w-40">
							<img src={logo} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
