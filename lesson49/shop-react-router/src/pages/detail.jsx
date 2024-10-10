import { ArrowLeftCircleIcon, HeartIcon } from '@heroicons/react/24/solid'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	IconButton,
	Typography
} from '@material-tailwind/react'
import { useContext, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { BackNavigateContext } from '../App'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'

export default function ProductDetail() {
	const { product: p } = useLoaderData()
	const { backNavigate } = useContext(BackNavigateContext)
	const [product, setProduct] = useState(p)
	const dispatch = useDispatch()

	function handleAddToCart() {
		dispatch(addItem(product))
		setProduct(prev => ({ ...prev, quantity: prev.quantity - 1 }))
		toast.success('Thêm sản phẩm thành công')
	}

	return (
		<section className="container mx-auto">
			<div className="grid grid-cols-2 gap-x-24">
				<div>
					<Card className="overflow-hidden">
						<img
							className="w-full"
							src={product.image}
							alt={product.name}
						/>
					</Card>
				</div>
				<div>
					<Card shadow={false} className="h-full">
						<CardBody>
							<div>
								<Typography
									variant="h3"
									color="blue-gray"
									className="mt-2"
								>
									{product.name}
								</Typography>

								<Typography
									variant="h4"
									color="blue-gray"
									className="mb-3"
								>
									${product.price}
								</Typography>
								<Typography variant="paragraph">
									{product.description}
								</Typography>
							</div>

							<div className="my-8 flex gap-5">
								<Button
									className="min-w-52"
									disabled={product.quantity === 0}
									onClick={handleAddToCart}
								>
									Add To Card
								</Button>
								<IconButton variant="text">
									<HeartIcon className="size-6" />
								</IconButton>
							</div>

							<div>
								<Typography
									variant="h6"
									color="blue-gray"
									className="my-4"
								>
									Thông tin
								</Typography>
								<hr />
								<ul className="list-disc pl-5">
									<li>
										<Typography
											variant="paragraph"
											color="gray"
										>
											Loại: {product.category}
										</Typography>
									</li>
									<li>
										<Typography
											variant="paragraph"
											color="gray"
										>
											Nhà sản xuất: {product.brand}
										</Typography>
									</li>
								</ul>
							</div>
						</CardBody>
						<CardFooter className="relative flex-grow">
							<div className="absolute bottom-0 right-0">
								<Button
									variant="outlined"
									className="flex items-center"
									onClick={backNavigate}
								>
									<ArrowLeftCircleIcon className="mr-3 size-6" />
									Quay lại
								</Button>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	)
}
