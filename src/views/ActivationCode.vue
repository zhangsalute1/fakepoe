<template>
    <div class="activation-code">
        <h2>激活码</h2>
        <a-form @submit="handleSubmit">
            <a-form-item label="激活码">
                <a-input v-model:value="code" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { verifyActivationCode } from '@/api/activationCode'

export default defineComponent({
    setup() {
        const code = ref('')

        const handleSubmit = async () => {
            try {
                await verifyActivationCode(code.value)
                // 激活码验证成功后的处理逻辑
            } catch (error) {
                // 处理激活码验证失败的逻辑
            }
        }

        return {
            code,
            handleSubmit,
        }
    },
})
</script>

<style scoped>
.activation-code {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>