import axios from 'axios'

export function register(email, password) {
    return axios.post('/register', { email, password })
}