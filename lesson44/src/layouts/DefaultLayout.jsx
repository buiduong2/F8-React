import { Button, Typography } from '@material-tailwind/react'
import TheFooter from '../components/TheFooter'
import TheHeader from '../components/TheHeader'

// eslint-disable-next-line react/prop-types
export default function DefaultLayout({ children }) {
	return (
		<>
			<TheHeader />
			<main className="mt-16"> {children}</main>
			<TheFooter />
			<div>
				<a>
					<Button
						variant="text"
						className="bg-white !fixed bottom-4 right-4 z-40 flex items-center gap-1 p-2 pr-4 shadow-lg hover:bg-white hover:shadow-xl"
					>
						<img
							src="logos/favicon.png"
							alt="Metarial Tailwind"
							className="size-5"
						/>
						<Typography
							as="span"
							color="blue-gray"
							variant="h6"
							className="text-xs"
						>
							Made With Material Tailwind
						</Typography>
					</Button>
				</a>
			</div>
		</>
	)
}
