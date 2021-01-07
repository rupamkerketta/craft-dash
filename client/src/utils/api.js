import axios from 'axios'

const production = 'https://www.craftdash.xyz/api'
const dev = 'http://localhost:5000/api'

export const server =
	window.location.hostname === 'localhost'
		? dev.substring(0, dev.length - 4)
		: production.substring(0, production.length - 4)

const api = axios.create({
	baseURL: window.location.hostname === 'localhost' ? dev : production,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})

export default api
