import axios from 'axios'

export function sendMessage(message) {
    return axios.post('/api/chat', { message })
}

export function getHistory() {
    return axios.get('/api/chat/history')
}