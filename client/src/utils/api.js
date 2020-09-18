import axios from 'axios'

const api = axios.create({
	baseURL: 'https://craft-dash.herokuapp.com/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})

export default api
