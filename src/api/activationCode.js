import axios from 'axios'

export function verifyActivationCode(code) {
    return axios.post('/api/verify-code', { code })
}