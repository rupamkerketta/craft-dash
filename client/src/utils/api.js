import axios from 'axios'

const production = 'https://craft-dash.herokuapp.com/api'
const dev = 'http://localhost:5000/api'

const api = axios.create({
	baseURL: window.location.hostname === 'localhost' ? dev : production,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})

export default api
