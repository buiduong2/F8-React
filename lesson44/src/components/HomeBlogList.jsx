import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography
} from '@material-tailwind/react'

import PropTypes from 'prop-types'

HomeBlogList.propTypes = {
	blogs: PropTypes.arrayOf(PropTypes.object)
}

export default function HomeBlogList({blogs}) {


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
