<template>
    <div class="register">
        <h2>注册</h2>
        <a-form @submit="handleSubmit">
            <a-form-item label="邮箱">
                <a-input v-model:value="email" />
            </a-form-item>
            <a-form-item label="密码">
                <a-input-password v-model:value="password" />
            </a-form-item>
            <a-form-item label="确认密码">
                <a-input-password v-model:value="confirmPassword" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">注册</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { register } from '@/api/register'

export default defineComponent({
    setup() {
        const email = ref('')
        const password = ref('')
        const confirmPassword = ref('')

        const handleSubmit = async () => {
            if (password.value !== confirmPassword.value) {
                // 处理密码不一致的逻辑
                return
            }

            try {
                await register(email.value, password.value)
                // 注册成功后的处理逻辑
            } catch (error) {
                // 处理注册失败的逻辑
            }
        }

        return {
            email,
            password,
            confirmPassword,
            handleSubmit,
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