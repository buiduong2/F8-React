import { Button, Typography } from '@material-tailwind/react'

export default function TheFooter() {
	return (
		<footer className="container mx-auto flex w-full flex-row flex-wrap items-center justify-between gap-y-6 border-t border-blue-gray-50 py-6 mt-32">
			<Typography className="text-gray-700">
				&copy; 2024 Made with <a href="#">Material Tailwind</a> by
				<a href="#"> Creative Tim</a>
			</Typography>
			<ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
				<li>
					<Typography
						as="a"
						href="#"
						variant="small"
						className="font-normal text-gray-700 transition-colors hover:text-gray-900 focus:text-gray-900"
					>
						Home
					</Typography>
				</li>
				<li>
					<Typography
						as="a"
						href="#"
						variant="small"
						className="font-normal text-gray-700 transition-colors hover:text-gray-900 focus:text-gray-900"
					>
						About Us
					</Typography>
				</li>
				<li>
					<Typography
						as="a"
						href="#"
						variant="small"
						className="font-normal text-gray-700 transition-colors hover:text-gray-900 focus:text-gray-900"
					>
						Blog
					</Typography>
				</li>
				<li>
					<Typography
						as="a"
						href="#"
						className="font-normal text-gray-700 transition-colors hover:text-gray-900 focus:text-gray-900"
					>
						Service
					</Typography>
				</li>
				<li>
					<Button>SUBSCRIBE</Button>
				</li>
			</ul>
		</footer>
	)
}
