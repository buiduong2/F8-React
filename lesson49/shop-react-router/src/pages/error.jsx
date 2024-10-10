import { FlagIcon } from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'
import { useContext } from 'react'
import { useRouteError } from 'react-router-dom'
import { BackNavigateContext } from '../App'

export function ErrorPage() {
	const error = useRouteError()

	let backNavigate
	try {
		const context = useContext(BackNavigateContext)
		backNavigate = context.backNavigate
	} catch {
		backNavigate = function () {
			window.location = '/'
		}
	}
	return (
		<div className="mx-auto grid h-screen place-items-center px-8 text-center">
			<div>
				<FlagIcon className="mx-auto h-20 w-20" />
				<Typography
					variant="h1"
					color="blue-gray"
					className="mt-10 !text-3xl !leading-snug md:!text-4xl"
				>
					Error {error.status || 500} <br />
					{error.statusText || 'It looks like something went wrong.'}
				</Typography>
				<Typography className="mx-auto mb-14 mt-8 text-[18px] font-normal text-gray-500 md:max-w-sm">
					Don&apos;t worry, our team is already on it.Please try
					refreshing the page or come back later.
				</Typography>
				<Button
					color="gray"
					className="w-full px-4 md:w-[8rem]"
					onClick={backNavigate}
				>
					back home
				</Button>
			</div>
		</div>
	)
}

export default ErrorPage
