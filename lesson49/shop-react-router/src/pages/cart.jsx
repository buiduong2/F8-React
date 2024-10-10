import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BackNavigateContext } from '../App'
import CartItem from '../components/CartItem'
import {
	checkout,
	getTotalPrice,
	removeItem,
	updateItemQuantity
} from '../redux/slices/cartSlice'
import { useNavigate } from 'react-router-dom'

export default function ProductCart() {
	const cart = useSelector(state => state.cart.cart)
	const totalPrice = useSelector(getTotalPrice)
	const { backNavigate } = useContext(BackNavigateContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function handleGoBackBtn() {
		backNavigate()
	}

	function handleUpdateQuantity(cartItem, quantity) {
		dispatch(updateItemQuantity({ _id: cartItem._id, quantity }))
	}

	function handleRemoveItem(cart) {
		dispatch(removeItem(cart))
	}

	function handleCheckOut() {
		dispatch(checkout())
		toast.success('Thanh toán thành công')
		navigate('/products?checkout-successfull')
	}
	return (
		<section className="container mx-auto px-2 py-20">
			<div className="mb-20 flex flex-col items-center">
				<Typography variant="h3">Shopping Cart</Typography>
				<Typography
					color="gray"
					variant="lead"
					className="mt-3 font-bold"
				>
					You are eligible for Free Shipping.
				</Typography>
			</div>

			<div className="grid grid-cols-3 gap-10">
				<ul className="col-span-2 w-5/6">
					{cart.length === 0 && (
						<Typography
							variant="h3"
							color="gray"
							className="text-center italic"
						>
							chưa có vật phẩm nào
						</Typography>
					)}
					{cart.map((cartItem, index) => (
						<li key={cartItem._id}>
							<CartItem
								cart={cartItem}
								updateQuantity={handleUpdateQuantity}
								removeItem={handleRemoveItem}
							/>
							{index !== cart.length - 1 && (
								<hr className="my-10" />
							)}
						</li>
					))}
				</ul>
				<div className="col-span-1">
					<Card className="border" shadow={false}>
						<CardBody>
							<Typography variant="h5" color="black">
								Order Summary
							</Typography>

							<ul className="mt-5">
								<li className="flex justify-between border-b py-3">
									<Typography
										variant="paragraph"
										className="text-base"
									>
										Giá tiền:
									</Typography>
									<Typography
										variant="paragraph"
										className="text-base"
									>
										${totalPrice}
									</Typography>
								</li>
								<li className="flex justify-between border-b py-3">
									<Typography
										variant="paragraph"
										className="text-base"
									>
										Phí Ship
									</Typography>
									<Typography
										variant="paragraph"
										className="text-base"
									>
										{cart.length === 0 ? 0 : '$10000'}
									</Typography>
								</li>
							</ul>
							<div className="mt-10 flex justify-between">
								<Typography color="black" variant="h5">
									Total:{' '}
								</Typography>
								<Typography color="black" variant="h5">
									{cart.length === 0 ? 0 : totalPrice + 10000}
								</Typography>
							</div>
							<div className="mt-10 flex flex-col gap-4">
								<Button
									fullWidth={true}
									onClick={handleCheckOut}
								>
									{' '}
									Check Out
								</Button>
								<Button
									fullWidth={true}
									variant="text"
									onClick={handleGoBackBtn}
								>
									Mua thêm
								</Button>
							</div>
							<Typography
								className="mt-4 text-center text-sm font-light"
								color="gray"
							>
								Mua không trả lại không kiểm tra hàng
							</Typography>
						</CardBody>
					</Card>
				</div>
			</div>
		</section>
	)
}
