import { Typography } from '@material-tailwind/react'
import PropTypes from 'prop-types'

HomeClientList.propTypes = {
	logos: PropTypes.arrayOf(PropTypes.string)
}

export default function HomeClientList({ logos }) {
	return (
		<section className="px-8 py-28">
			<div className="container mx-auto">
				<Typography
					variant="h6"
					color="blue-gray"
					className="mb-8 text-center"
				>
					My awesome clients
				</Typography>

				<div className="flex flex-wrap items-center justify-center gap-6">
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
