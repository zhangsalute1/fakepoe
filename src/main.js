import { createApp } from 'vue'
import Antd from 'ant-design-vue'

import App from './App.vue'
// import router from './router/index.js'

const app = createApp(App)
app.use(Antd)
// app.use(router)
app.mount('#app')

