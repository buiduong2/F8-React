import { Typography } from '@material-tailwind/react'

export default function HomeClientList() {
	const logos = [
		'logo-coinbase.svg',
		'logo-spotify.svg',
		'logo-pinterest.svg',
		'logo-google.svg',
		'logo-amazon.svg',
		'logo-netflix.svg'
	]

	return (
		<section className="px-8 py-28">
			<Typography
				variant="h6"
				color="blue-gray"
				className="mb-8 text-center"
			>
				My awesome clients
			</Typography>

			<div className="flex items-center justify-center flex-wrap gap-6">
				{logos.map((logo, index) => (
					<div key={index}  className='w-40'>
						<img src={`/logos/${logo}`} />
					</div>
				))}
			</div>
		</section>
	)
}
