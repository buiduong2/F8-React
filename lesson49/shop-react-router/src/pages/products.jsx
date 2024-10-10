import { Typography } from '@material-tailwind/react'

import Product from '../components/Product'
import AppPagination from '../components/AppPagination'
import { useLoaderData } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'

export default function ProductShow() {
	const { products, totalPage, page } = useLoaderData()

	const [localProducts, setLocalProducts] = useState(products)

	const dispatch = useDispatch()

	useEffect(() => {
		setLocalProducts(products)
	}, [products])

	const addToCart = useCallback(product => {
		dispatch(addItem(product))
		setLocalProducts(prev => {
			return prev.map(p =>
				p === product
					? { ...product, quantity: product.quantity - 1 }
					: p
			)
		})
		toast.success(`Thêm ${product.name} vào giỏ hàng thành công`)
	}, [])

	return (
		<>
			<section className="container mx-auto my-24">
				<div className="mt-10 flex flex-col items-center">
					<Typography variant="h6" color="blue-gray" className="mb-4">
						Tailored Product Search
					</Typography>
					<Typography variant="h1" color="blue-gray" className="mb-4">
						Find What You Need
					</Typography>
					<Typography
						variant="paragraph"
						color="gray"
						className="max-w-2xl text-center"
					>
						Simplify your shopping experience with our intuitive
						filter system. Whether you re looking for specific
						features, price ranges, or brands, our filters help you
						quickly narrow down options, so you can find exactly
						what you need with ease.!
					</Typography>
				</div>
				<div className="mt-6 grid grid-cols-4 gap-5">
					{localProducts.map((product, index) => (
						<Product
							key={index}
							product={product}
							addToCart={addToCart}
						/>
					))}
				</div>

				<div className="mt-12 flex justify-center">
					<AppPagination count={totalPage} currentPage={page} />
				</div>
			</section>
		</>
	)
}
