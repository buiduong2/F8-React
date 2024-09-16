import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography
} from '@material-tailwind/react'

export default function HomeBlogList() {
	const blogs = [
		{
			id: 1,
			imgUrl: '/images/blog1.svg',
			title: 'Mobile App Development',
			desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
			herf: '#'
		},
		{
			id: 2,
			imgUrl: '/images/blog2.svg',
			title: 'Landing Page Development',
			desc: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
			herf: '#'
		},

		{
			id: 3,
			imgUrl: '/images/blog3.svg',
			title: 'Landing Page Development',
			desc: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
			herf: '#'
		},

		{
			id: 4,
			imgUrl: '/images/blog4.svg',
			title: 'E-commerce development',
			desc: 'Ecommerce website offering access to the latest and greatest gadgets and accessories.',
			herf: '#'
		},

		{
			id: 5,
			imgUrl: '/images/blog1.svg',
			title: 'Mobile App Development',
			desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
			herf: '#'
		},
		{
			id: 6,
			imgUrl: '/images/blog2.svg',
			title: 'Landing Page Development',
			desc: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
			herf: '#'
		},

		{
			id: 7,
			imgUrl: '/images/blog3.svg',
			title: 'Landing Page Development',
			desc: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
			herf: '#'
		},

		{
			id: 8,
			imgUrl: '/images/blog4.svg',
			title: 'E-commerce development',
			desc: 'Ecommerce website offering access to the latest and greatest gadgets and accessories.',
			herf: '#'
		}
	]

	return (
		<section className="px-8 py-28">
			<div className="container mx-auto">
				<div className="mb-20 text-center">
					<Typography variant="h2" color="blue-gray">
						My Projects
					</Typography>

					<Typography
						variant="lead"
						color="gray"
						className="mx-auto p-4 lg:w-6/12"
					>
						Whether you have a mobile app idea that needs to come to
						life or a website that requires a facelift, I&rsquo;m
						here to turn your digital dreams into reality.
					</Typography>
				</div>

				<div className="flex flex-wrap gap-y-20">
					{blogs.map(blog => (
						<Card
							className="m-0 w-full md:w-1/2 xl:w-1/4"
							shadow={false}
							key={blog.id}
						>
							<CardHeader floated={false}>
								<img
									src={blog.imgUrl}
									alt={blog.title}
									className="w-full"
								/>
							</CardHeader>
							<CardBody>
								<a href={blog.href}>
									<Typography variant="h5" color="blue-gray">
										{blog.title}
									</Typography>
								</a>
								<Typography
									variant="paragraph"
									color="gray"
									className="mt-2"
								>
									{blog.desc}
								</Typography>
							</CardBody>

							<CardFooter className="py-0">
								<Button size="sm">SEE DETAILS</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
