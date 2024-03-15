<template>
    <a-form @submit="handleSubmit">
        <a-form-item label="邮箱">
            <a-input v-model:value="email" />
        </a-form-item>
        <a-form-item label="密码">
            <a-input-password v-model:value="password" />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const email = ref('')
        const password = ref('')

        const handleSubmit = () => {
            // 处理登录逻辑
        }

        return {
            email,
            password,
            handleSubmit,
        }
    },
})
</script>