import {
	Typography,
	Card,
	CardHeader,
	CardBody,
	CardFooter
} from '@material-tailwind/react'

import {
	RectangleGroupIcon,
	FingerPrintIcon,
	SwatchIcon,
	HashtagIcon,
	EyeIcon,
	DocumentTextIcon
} from '@heroicons/react/24/solid'

export default function HomeSkillList() {
	const skills = [
		{
			id: 1,
			icon: RectangleGroupIcon,
			title: 'Frontend Web Development:',
			desc: 'Creating beautiful and functional web experiences is my forte. Using the latest technologies and best practices, I design and build websites that captivate and engage users.'
		},
		{
			id: 2,
			icon: FingerPrintIcon,
			title: 'Mobile App Development',
			desc: 'I specialize in creating responsive and intuitive mobile apps that work seamlessly across iOS & Android devices. From concept to deployment, I handle every stage of the development process.'
		},
		{
			id: 3,
			icon: SwatchIcon,
			title: 'Technology Stack',
			desc: "I'm well-versed in the industry's most popular frontend technologies, including HTML5, CSS3, JavaScript, and frameworks like React and React Native."
		},
		{
			id: 4,
			icon: HashtagIcon,
			title: 'Web Optimization',
			desc: 'Performance matters. I optimize websites and apps for speed, ensuring your users enjoy a fast and responsive experience, which in turn boosts user satisfaction and SEO rankings.'
		},
		{
			id: 5,
			icon: EyeIcon,
			title: 'User-Centric Design',
			desc: 'My development goes hand-in-hand with an eye for design. I create user interfaces that are not only functional but also aesthetically pleasing, providing a seamless and enjoyable user journey.'
		},
		{
			id: 6,
			icon: DocumentTextIcon,
			title: 'Testing and Quality Assurance',
			desc: 'I rigorously test and debug applications to guarantee a bug-free and secure environment for users. Your peace of mind is as important to me as the functionality of your project.'
		}
	]

	return (
		<section className="container mx-auto">
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
					className="mx-auto w-4/6 font-normal text-gray-500"
				>
					I&rsquo;m not just a developer; I&rsquo;m a digital
					dreamweaver. Crafting immersive online experiences is not
					just a job but my calling. Discover below how I can help you
				</Typography>
			</div>

			<div className="flex flex-wrap gap-y-10">
				{skills.map(skill => (
					<Card key={skill.id} className="w-1/3 p-6" shadow={false}>
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
							<Typography variant="h5" className="text-center">
								{skill.title}
							</Typography>
						</CardBody>
						<CardFooter className="px-8 py-0">
							<Typography className="text-center font-normal text-gray-500">
								{skill.desc}
							</Typography>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	)
}
