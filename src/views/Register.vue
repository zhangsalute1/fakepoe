<template>
    <div class="register">
        <h2>注册</h2>
        <a-form @submit.prevent="handleSubmit">
            <a-form-item label="邮箱">
                <a-input v-model:value="email" placeholder="请输入邮箱" />
                <a-alert v-if="emailError" type="error" message="请输入有效的邮箱地址" show-icon />
            </a-form-item>
            <a-form-item label="密码">
                <a-input-password v-model:value="password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item label="确认密码">
                <a-input-password v-model:value="confirmPassword" placeholder="请再次输入密码" />
                <a-alert v-if="passwordError" type="error" message="两次输入的密码不一致" show-icon />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">注册</a-button>
            </a-form-item>
            <a-alert v-if="generalError" type="error" :message="generalError" show-icon />
        </a-form>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { register } from '@/api/register'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';

export default defineComponent({
    setup() {
        const email = ref('')
        const password = ref('')
        const confirmPassword = ref('')
        const emailError = ref(false)
        const passwordError = ref(false)
        const generalError = ref('')
        const router = useRouter()

        const validateEmail = (email) => {
            return /\S+@\S+\.\S+/.test(email)
        }

        const handleSubmit = async () => {
            emailError.value = !validateEmail(email.value)
            passwordError.value = password.value !== confirmPassword.value
            if (emailError.value || passwordError.value) {
                return
            }

            try {
                await register(email.value, password.value)
                // 注册成功，你可以在这里重定向到登录页面或显示成功消息
                message.success('注册成功')
                router.push('/login')
            } catch (error) {
                // 在这里处理注册失败的逻辑，例如显示错误消息
                generalError.value = error.response.data.message || '注册失败，请稍后再试。'
            }
        }

        return {
            email,
            password,
            confirmPassword,
            handleSubmit,
            emailError,
            passwordError,
            generalError,
        }
    },
})
</script>

<style scoped>
.register {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>
