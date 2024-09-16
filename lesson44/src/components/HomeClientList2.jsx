import { Typography } from '@material-tailwind/react'

export default function HomeClientList2() {
	const logos = [
		'logo-coinbase.svg',
		'logo-spotify.svg',
		'logo-pinterest.svg',
		'logo-google.svg',
		'logo-amazon.svg',
		'logo-netflix.svg'
	]
	return (
		<section className="mx-8 my-20">
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
							<img src={`/logos/${logo}`} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
