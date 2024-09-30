import axios from 'axios'
import { apiUrl } from '../main'

export async function getProduct() {
	try {
		const res = await axios.get(`${apiUrl}/products?limit=8`)
		return res.data.data.listProduct
	} catch {
		return []
	}
}
