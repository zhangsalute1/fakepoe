import { createApp } from 'vue'
import Antd from 'ant-design-vue'

import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
app.use(Antd)
app.use(router)
app.mount('#app')

import axios from 'axios'

// 配置 API 的基础 URL
axios.defaults.baseURL = 'http://api.example.com'

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config
    },
    error => {
        // 处理请求错误
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        return response
    },
    error => {
        // 处理响应错误
        return Promise.reject(error)
    }
)