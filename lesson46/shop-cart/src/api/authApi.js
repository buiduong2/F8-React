import axios from 'axios'
import { apiUrl } from '../main'
export function login(email) {
	return axios.get(`${apiUrl}/api-key?=email=${email}`)
}
