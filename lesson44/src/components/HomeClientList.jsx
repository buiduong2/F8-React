import { Typography } from '@material-tailwind/react'
import PropTypes from 'prop-types'

HomeClientList.propTypes = {
	logos: PropTypes.arrayOf(PropTypes.string)
}

export default function HomeClientList({ logos }) {
	return (
		<section className="px-8 py-28">
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
						<img src={`/logos/${logo}`} />
					</div>
				))}
			</div>
		</section>
	)
}
