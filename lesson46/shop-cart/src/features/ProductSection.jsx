import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography
} from '@material-tailwind/react'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getProduct } from '../api/productApi'
import { CartContext } from '../App'
export default function ProductSection() {
	const { addToCart } = useContext(CartContext)

	const [products, setProducts] = useState([])

	function handleClickAddToCartBtn(product) {
		addToCart(product)
		toast.success('Đã thêm một vật phẩm vào giỏ hàng')
	}

	useEffect(() => {
		async function initProduct() {
			setProducts(await getProduct())
		}

		initProduct()
	}, [])

	return (
		<section className=" pt-3">
			<div className="container mx-auto">
				<Typography
					variant="h3"
					color="white"
					className="text-center mb-5 "
				>
					Welcome to Shop
				</Typography>

				{products.length === 0 && (
					<div className="h-screen w-full flex items-center justify-center">
						<span className="animate-spin w-14 h-14 border-4 border-white border-b-orange-600 rounded-full inline-block box-border"></span>
					</div>
				)}
				<div className="grid grid-cols-4 gap-4">
					{products.map(product => (
						<Card key={product._id}>
							<CardHeader shadow={false} floated={false}>
								<img
									src={product.image}
									alt="card-image"
									className="h-full w-full object-cover"
								/>
							</CardHeader>
							<CardBody>
								<div className="mb-2 flex items-center justify-between gap-2">
									<Typography
										color="blue-gray"
										className="font-bold"
									>
										{product.name}
									</Typography>
									<Typography
										color="red"
										className="font-bold"
									>
										${product.price}
									</Typography>
								</div>
							</CardBody>
							<CardFooter className="pt-0 flex-grow flex items-end">
								<Button
									ripple={false}
									fullWidth={true}
									onClick={() =>
										handleClickAddToCartBtn(product)
									}
									className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
								>
									Add to Cart
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
