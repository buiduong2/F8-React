/* eslint-disable react/prop-types */
import { Badge, IconButton, Navbar, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import { getOrderQuanitty } from '../redux/slices/cartSlice'

function DefaultLayout({ children }) {
	const orderQuantity = useSelector(getOrderQuanitty)

	return (
		<>
			<header>
				<Navbar className="fixed left-0 right-0 top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
					<div className="flex items-center justify-between text-blue-gray-900">
						<Typography
							as={Link}
							to="/"
							className="mr-4 cursor-pointer py-1.5 font-medium"
						>
							My Shopee Cart
						</Typography>
						<Link to={'/cart'}>
							<Badge content={String(orderQuantity)}>
								<IconButton variant="text">
									<ShoppingCartIcon className="size-7 text-blue-gray-900" />
								</IconButton>
							</Badge>
						</Link>
					</div>
				</Navbar>
			</header>
			<main className="my-24">{children}</main>
		</>
	)
}

export default DefaultLayout
