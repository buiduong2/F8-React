import axios from 'axios'
import { apiUrl } from '../main'

export function orderApi(data) {
	return axios.post(`${apiUrl}/orders`, data)
}
