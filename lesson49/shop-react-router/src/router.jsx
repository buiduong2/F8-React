import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import ProductCart from './pages/cart'
import ProductDetail from './pages/detail'
import ErrorPage from './pages/error'
import ProductShow from './pages/products'
import { convertToSlug } from './utils/util'
const apiUrl = import.meta.env.VITE_API_URL
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Navigate to="/products" />
					},
					{
						path: 'products',
						loader: productsLoader,
						shouldRevalidate: ({ currentUrl, nextUrl }) => {
							return currentUrl.search !== nextUrl.search
						},
						element: <ProductShow />
					},
					{
						path: 'details/:slug/:id',
						loader: detailsLoader,
						element: <ProductDetail />
					},
					{
						path: 'cart',
						element: <ProductCart />
					},
					{
						path: '*',
						loader: () => {
							throw new Response('', {
								status: 404,
								statusText: 'Page not found'
							})
						},
						element: <p>Oops</p>
					}
				]
			}
		]
	}
])

export async function productsLoader({ request }) {
	const url = new URL(request.url)
	const searchParams = url.searchParams
	searchParams.set('limit', 8)
	if (!searchParams.has('page')) {
		searchParams.set('page', 1)
	}
	const page = Number(searchParams.get('page')) || 1

	const res = await fetch(apiUrl + '/products?' + searchParams.toString())
	if (res.ok) {
		const {
			data: { listProduct, totalPage }
		} = await res.json()
		return {
			products: listProduct.map(product => ({
				...product,
				slug: convertToSlug(product.name)
			})),
			totalPage,
			page
		}
	}
	throw new Response('', {
		status: res.status,
		statusText: 'Something went wrong when fetch Product List'
	})
}

export async function detailsLoader({ params }) {
	const id = params.id

	const res = await fetch(`${apiUrl}/products/${id}`)
	if (res.ok) {
		const { data } = await res.json()
		return {
			product: {
				...data,
				slug: convertToSlug(data.name)
			}
		}
	}

	if (res.status === 400) {
		throw new Response('', { status: 404, statusText: 'Product Not Found' })
	}

	throw new Error('hello world')
}

export default router
