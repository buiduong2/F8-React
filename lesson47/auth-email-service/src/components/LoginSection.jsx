import { useAuth0 } from '@auth0/auth0-react'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import { Mosaic } from 'react-loading-indicators'

export default function LoginSection() {
	const { loginWithPopup, isLoading } = useAuth0()
	return (
		<section className="container mx-auto flex justify-center items-center h-screen">
			{isLoading ? (
				<Mosaic color="#32cd32" size="medium" />
			) : (
				<Card className="bg-orange-500 max-w-5xl text-center  items-center">
					<CardBody>
						<Typography variant="h2" color="white">
							Welcome to F8
						</Typography>

						<Typography variant="h5" color="white">
							Thank you for using F8s services
						</Typography>
						<Typography
							variant="lead"
							color="white"
							className="my-3"
						>
							If you have any questions or help, log in and ask
							here!
						</Typography>
						<Button
							onClick={() => loginWithPopup()}
							color="white"
							className="w-8/12"
						>
							Login || Resgiter
						</Button>
					</CardBody>
				</Card>
			)}
		</section>
	)
}
