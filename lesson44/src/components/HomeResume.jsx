import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Typography
} from '@material-tailwind/react'
import {
	ArrowRightIcon,
	ChartBarIcon,
	PuzzlePieceIcon,
	CursorArrowRaysIcon
} from '@heroicons/react/24/solid'

export default function HomeResume() {
	const certs = [
		{
			id: 1,
			label: 'Bachelor of Science in Computer Science',
			icon: ChartBarIcon
		},
		{
			id: 2,
			label: 'Certified Web Developer',
			icon: PuzzlePieceIcon
		},
		{
			id: 3,
			label: 'Frontend Framework Proficiency Certification',
			icon: CursorArrowRaysIcon
		}
	]

	return (
		<section className="container mx-auto my-24 flex gap-10">
			<div className="w-1/2">
				<Typography variant="h2" className="mb-3">
					My Resume
				</Typography>
				<Typography color="gray" className="mb-4 w-3/4">
					Highly skilled and creative Web Developer with 5+ years of
					experience in crafting visually stunning and functionally
					robust websites and web applications.
				</Typography>

				<Button variant="text" className="flex gap-2">
					VIEW MORE <ArrowRightIcon className="size-4" />
				</Button>
			</div>

			<div className="w-1/2">
				<div className="flex flex-col items-center gap-6">
					{certs.map(cert => (
						<Card
							key={cert.id}
							className="w-4/5 flex-row justify-start"
							shadow={false}
						>
							<CardHeader className="mt-0 flex size-12 items-center justify-center bg-black">
								{cert.icon.render({
									className: 'size-6 text-white'
								})}
							</CardHeader>
							<CardBody className="p-0">
								<Typography as="span" color="gray">
									{cert.label}
								</Typography>
							</CardBody>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
