import { Button, Input, Typography } from '@material-tailwind/react'

export default function HomeHero() {
	return (
		<section className="p-8">
			<div className="container mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
				<div className="">
					<Typography
						variant="h1"
						color="blue-gray"
						className="mb-4 text-3xl !leading-tight lg:text-5xl"
					>
						Welcome to my Web <br />
						Development Portofolio!
					</Typography>
					<Typography
						variant="lead"
						className="mb-4 md:pr-16 xl:pr-28"
						color="gray"
					>
						I&apos;m Lily Smith, a passionate web developer based in
						USA. Here, you&apos;ll get a glimpse of my journey in
						the world of web development, where creativity meets
						functionality.
					</Typography>

					<form action="POST">
						<Typography
							as="label"
							variant="paragraph"
							className="mb-2 text-sm"
						>
							Your email
						</Typography>
						<div className="flex flex-col gap-4 md:flex-row md:pr-28">
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
							color="gray"
							variant="paragraph"
							className="mt-2 text-sm"
						>
							Read my{' '}
							<a href="#" className="underline">
								Terms and Conditions
							</a>
						</Typography>
					</form>
				</div>

				<div className="row-start-1 w-full overflow-hidden lg:row-start-auto">
					<img
						src="images/image-7.svg"
						className="w-full object-cover rounded-xl lg:h-[36rem]"
					/>
				</div>
			</div>
		</section>
	)
}
