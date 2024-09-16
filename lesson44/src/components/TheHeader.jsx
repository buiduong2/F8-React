import {
	CommandLineIcon,
	RectangleStackIcon,
	UserCircleIcon,
	XMarkIcon,
	Bars4Icon
} from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'

export default function TheHeader() {
	function openNavBar(event) {
		event.currentTarget.classList.toggle('active')
		toggleNavMobile()
	}

	function toggleNavMobile() {
		const navMobile = document.querySelector('[data-id="nav-mobile"]')
		navMobile.classList.toggle('max-h-96')
		navMobile.classList.toggle('max-h-0')
	} 

	const NavList = (
		<ul className="flex gap-8 lg-max:flex-col lg-max:gap-4">
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
	)

	return (
		<header className="fixed inset-x-0 top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md p-4">
			<div className="container mx-auto flex items-center justify-between">
				<Typography variant="h6" color="blue-gray" className="text-lg">
					Material Tailwind
				</Typography>
				<nav className="nav-desktop lg-max:hidden">{NavList}</nav>
				<div className="flex gap-4 lg-max:hidden">
					<Button variant="text" className="text-xs">
						SIGN IN
					</Button>
					<Button className="text-xs">BLOCKS</Button>
				</div>
				<div className="lg:hidden">
					<Button
						onClick={openNavBar}
						variant="text"
						data-id="open-form-btn"
						className="flex size-10 items-center justify-center p-0"
					>
						<XMarkIcon className="size-6" />
						<Bars4Icon className="size-6" />
					</Button>
				</div>
			</div>
			<div
				className="border-t-solid transition-height max-h-0 overflow-hidden px-4 lg:hidden"
				data-id="nav-mobile"
			>
				<div className="container mx-auto border-t">
					<nav className="px-2 py-4"> {NavList}</nav>
					<div className="mb-4 mt-6 flex items-center gap-x-1">
						<Button variant="text">Log In</Button>
						<Button variant="gradient">Sign in</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
