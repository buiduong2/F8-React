import { Button, Typography } from '@material-tailwind/react'
import {
	RectangleStackIcon,
	UserCircleIcon,
	CommandLineIcon
} from '@heroicons/react/24/solid'
export default function TheHeader() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 bg-white bg-opacity-80 p-4 backdrop-blur-md">
			<div className="container mx-auto flex items-center justify-between">
				<Typography variant="h6" color="blue-gray" className="text-lg">
					Material Tailwind
				</Typography>
				<nav>
					<ul className="flex gap-4">
						<li>
							<Typography
								as="a"
								className="flex items-center gap-2 text-gray-900"
								href="#"
							>
								<RectangleStackIcon className="size-5" /> Page
							</Typography>
						</li>
						<li>
							<Typography
								as="a"
								className="flex items-center gap-2 text-gray-900"
								href="#"
							>
								<UserCircleIcon className="size-5" /> Account
							</Typography>
						</li>
						<li>
							<Typography
								as="a"
								className="flex items-center gap-2 text-gray-900"
								href="#"
							>
								<CommandLineIcon className="size-5" /> Docs
							</Typography>
						</li>
					</ul>
				</nav>
				<div className="flex gap-4">
					<Button variant="text" className="text-xs">
						SIGN IN
					</Button>
					<Button className="text-xs">BLOCKS</Button>
				</div>
			</div>
		</header>
	)
}
