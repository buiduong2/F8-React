/* eslint-disable react/prop-types */
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import {
	Card,
	CardBody,
	CardHeader,
	IconButton,
	Input,
	Typography
} from '@material-tailwind/react'
import React from 'react'

function CartItem({ cart, updateQuantity, removeItem }) {
	function handleIncrementQuantity() {
		updateQuantity(cart, cart.orderQuantity + 1)
	}

	function handleDecrementQuantity() {
		updateQuantity(cart, cart.orderQuantity - 1)
	}

	function hancleClickRemoveItem() {
		removeItem(cart)
	}

	return (
		<Card shadow={false} className="flex-row">
			<CardHeader shadow={false} floated={false}>
				<img src={cart.image} className="h-full w-full" />
			</CardHeader>
			<CardBody className="relative flex flex-grow flex-col">
				<div className="flex justify-between">
					<Typography
						variant="h3"
						color="black"
						className="font-bold"
					>
						{cart.name}
					</Typography>
					<IconButton variant="text" onClick={hancleClickRemoveItem}>
						<XMarkIcon className="size-6" />
					</IconButton>
				</div>
				<div className="w-80">
					<Typography
						variant="small"
						color="blue-gray"
						className="mb-1 font-medium"
					>
						Select Amount
					</Typography>
					<div className="relative w-full">
						<Input
							type="text"
							step="1"
							className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
							value={cart.orderQuantity}
							readOnly
							labelProps={{
								className:
									'before:content-none after:content-none'
							}}
							containerProps={{
								className: 'min-w-0'
							}}
						/>
						<div className="absolute right-1 top-1 flex gap-0.5">
							<IconButton
								size="sm"
								className="rounded"
								onClick={handleDecrementQuantity}
								disabled={cart.orderQuantity < 2}
							>
								<MinusIcon className="size-6" />
							</IconButton>
							<IconButton
								size="sm"
								className="rounded"
								onClick={handleIncrementQuantity}
								disabled={cart.quantity === 0}
							>
								<PlusIcon className="size-6" />
							</IconButton>
						</div>
						<Typography
							variant="small"
							color="gray"
							className="mt-2 font-normal"
						>
							Đơn giá: ${cart.price}
						</Typography>
					</div>
				</div>

				<div className="absolute bottom-0 mt-3">
					<Typography
						variant="h4"
						color="black"
						className="font-bold"
					>
						${cart.totalPrice}
					</Typography>
				</div>
			</CardBody>
		</Card>
	)
}

export default React.memo(CartItem)
