/* eslint-disable react/prop-types */
import { HeartIcon } from '@heroicons/react/24/solid'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	IconButton,
	Typography
} from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Product({ product, addToCart }) {
	return (
		<Card>
			<Link to={`/details/${product.slug}/${product._id}`}>
				<CardHeader floated={false}>
					<img className="w-full" src={product.image} />
				</CardHeader>
			</Link>
			<CardBody>
				<Typography color="blue-gray" variant="h5" className="mb-2">
					${product.price}
				</Typography>
				<Link to={`/details/${product.slug}/${product._id}`}>
					<Typography color="blue-gray" variant="h4" className="mb-2">
						{product.name}
					</Typography>
				</Link>
				<Typography variant="paragraph" className="!line-clamp-3">
					{product.description}
				</Typography>
			</CardBody>
			<CardFooter className="flex flex-grow items-end gap-5">
				<Button
					className="flex-grow"
					disabled={product.quantity === 0}
					onClick={() => addToCart(product)}
				>
					Add To Card
				</Button>
				<IconButton variant="text">
					<HeartIcon className="size-6" />
				</IconButton>
			</CardFooter>
		</Card>
	)
}

export default React.memo(Product)
