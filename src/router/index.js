
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ActivationCode from '@/views/ActivationCode.vue'
import Chat from '@/views/Chat.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/activation-code', component: ActivationCode },
    { path: '/chat', component: Chat },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router