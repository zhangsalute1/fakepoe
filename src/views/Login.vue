<template>
    <div class="login">
        <h2>登录</h2>
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
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { login } from '@/api/login'

export default defineComponent({
    setup() {
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            try {
                await login(email.value, password.value)
                // 登录成功后的处理逻辑
            } catch (error) {
                // 处理登录失败的逻辑
            }
        }

        return {
            email,
            password,
            handleSubmit,
        }
    },
})
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>