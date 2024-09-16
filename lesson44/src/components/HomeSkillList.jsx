import {
	Typography,
	Card,
	CardHeader,
	CardBody,
	CardFooter
} from '@material-tailwind/react'

import PropTypes from 'prop-types'

HomeSkillList.propTypes = {
	skills: PropTypes.arrayOf(PropTypes.object)
}

export default function HomeSkillList({skills}) {
	

	return (
		<section className="px-8">
			<div className="container mx-auto">
				<div className="mb-20 text-center">
					<Typography variant="h6" color="blue-gray" className="mb-2">
						MY SKILLS
					</Typography>
					<Typography
						variant="h1"
						color="blue-gray"
						className="mb-4 text-5xl leading-tight"
					>
						What I do
					</Typography>
					<Typography
						variant="lead"
						color="gray"
						className="mx-auto lg:w-4/6"
					>
						I&rsquo;m not just a developer; I&rsquo;m a digital
						dreamweaver. Crafting immersive online experiences is
						not just a job but my calling. Discover below how I can
						help you
					</Typography>
				</div>

				<div className="flex flex-wrap gap-y-10">
					{skills.map(skill => (
						<Card
							key={skill.id}
							className="lg:w-1/3 md:w-1/2 w-full p-6"
							shadow={false}
						>
							<CardHeader
								className="flex justify-center"
								shadow={false}
							>
								<div className="flex size-12 items-center justify-center rounded-full bg-gray-900">
									{skill.icon.render({
										className: 'size-6 text-white'
									})}
								</div>
							</CardHeader>
							<CardBody className="mb-2 mt-6 p-0">
								<Typography
									variant="h5"
									className="text-center"
								>
									{skill.title}
								</Typography>
							</CardBody>
							<CardFooter className="px-8 py-0">
								<Typography
									color="gray"
									className="text-center"
								>
									{skill.desc}
								</Typography>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
