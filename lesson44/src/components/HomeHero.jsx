import { Button, Input, Typography } from '@material-tailwind/react'

export default function HomeHero() {
	return (
		<section className="container mx-auto flex items-center gap-10 py-8">
			<div className="w-1/2">
				<Typography
					variant="h1"
					className="mb-4 text-5xl leading-tight"
				>
					Welcome to my Web <br />
					Development Portofolio!
				</Typography>
				<Typography className="mb-4 pr-28 text-xl font-normal leading-8 text-gray-500">
					I&apos;m Lily Smith, a passionate web developer based in
					USA. Here, you&apos;ll get a glimpse of my journey in the
					world of web development, where creativity meets
					functionality.
				</Typography>

				<form action="POST">
					<Typography as="label" className="mb-2 text-sm font-normal">
						Your email
					</Typography>
					<div className="flex gap-4 pr-28">
						<Input
							variant="outlined"
							label="Enter your email"
							size="lg"
						/>
						<Button className="flex-shrink-0 text-xs" size="lg">
							REQUIRE OFFER
						</Button>
					</div>

					<Typography
						as="p"
						className="mt-2 text-sm font-normal text-gray-500"
					>
						Read my{' '}
						<a href="#" className="underline">
							Terms and Conditions
						</a>
					</Typography>
				</form>
			</div>

			<div className="w-1/2">
				<img src="images/image-7.svg" className="w-full" />
			</div>
		</section>
	)
}
