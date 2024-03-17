import axios from 'axios'

export function register(email, password) {
    return axios.post('/api/register', { email, password })
}