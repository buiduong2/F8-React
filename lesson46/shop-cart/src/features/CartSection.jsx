import { Button, Card, Typography } from '@material-tailwind/react'
import { useContext, useState } from 'react'
import { CartContext } from '../App'
function CartSection() {
	const TABLE_HEAD = ['TÊN SẢN PHẨM', 'SỐ LƯỢNG', 'CÒN LẠI', 'TỔNG TIỀN']

	const [loadingCheckout, setLoadingCheckout] = useState(false)

	const { cart, checkout } = useContext(CartContext)

	const TABLE_ROWS = [...cart]

	function handleOnClickCheckoutBtn() {
		setLoadingCheckout(true)
		checkout().finally(() => setLoadingCheckout(false))
	}

	return (
		<section className="container mx-auto mt-10">
			<Card>
				<table className="w-full min-w-max table-auto text-left bg-white">
					<thead>
						<tr>
							{TABLE_HEAD.map(head => (
								<th
									key={head}
									className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal leading-none opacity-70"
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{TABLE_ROWS.map((product, index) => {
							const isLast = index === TABLE_ROWS.length - 1
							const classes = isLast
								? 'p-4'
								: 'p-4 border-b border-blue-gray-50'

							return (
								<tr key={product._id}>
									<td className={classes}>
										<Typography
											variant="paragraph"
											color="blue-gray"
											className="font-bold"
										>
											{product.name}
										</Typography>
									</td>
									<td className={classes}>
										<Typography
											variant="paragraph"
											color="blue-gray"
											className="font-normal"
										>
											{product.orderQuantity}
										</Typography>
									</td>
									<td className={classes}>
										<Typography
											variant="paragraph"
											color="blue-gray"
											className="font-normal"
										>
											{product.quantity}
										</Typography>
									</td>
									<td className={classes}>
										<Typography
											as="a"
											href="#"
											variant="paragraph"
											color="blue-gray"
											className="font-medium"
										>
											{product.totalPrice}
										</Typography>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</Card>
			<div>
				<Button
					color="green"
					onClick={handleOnClickCheckoutBtn}
					loading={loadingCheckout}
				>
					Thanh Toán
				</Button>
			</div>
		</section>
	)
}

CartSection.propTypes = {}

export default CartSection
