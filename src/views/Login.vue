<template>
    <div class="login">
        <h2>登录</h2>
        <a-form @submit.prevent="handleSubmit">
            <a-form-item label="邮箱" :validate-status="emailError ? 'error' : 'success'" :help="emailError">
                <a-input v-model:value="email" placeholder="请输入邮箱" />
            </a-form-item>
            <a-form-item label="密码" :validate-status="passwordError ? 'error' : 'success'" :help="passwordError">
                <a-input-password v-model:value="password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
            <a-alert v-if="loginError" type="error" :message="loginError" show-icon />
        </a-form>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login'
import { message } from 'ant-design-vue'

export default defineComponent({
    setup() {
        const email = ref('')
        const password = ref('')
        const emailError = ref('')
        const passwordError = ref('')
        const loginError = ref('')
        const router = useRouter()

        const validateForm = () => {
            emailError.value = ''
            passwordError.value = ''
            let isValid = true
            if (!email.value) {
                emailError.value = '邮箱不能为空'
                isValid = false
            }
            if (!password.value) {
                passwordError.value = '密码不能为空'
                isValid = false
            }
            return isValid
        }

        const handleSubmit = async () => {
            if (!validateForm()) {
                return
            }
            try {
                await login(email.value, password.value)
                // 登录成功后，可以根据需要重定向到主页或其他页面
                message.success('登录成功')
                router.push('/chat')
            } catch (error) {
                // 处理登录失败的逻辑，显示一个错误消息
                loginError.value = '登录失败，请检查您的邮箱和密码'
            }
        }

        return {
            email,
            password,
            emailError,
            passwordError,
            loginError,
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