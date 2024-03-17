<template>
    <div class="chat">
        <h2>聊天</h2>
        <div class="chat-history">
            <!-- 显示聊天记录 -->
        </div>
        <div class="chat-input">
            <a-input v-model:value="message" placeholder="请输入消息" />
            <a-button type="primary" @click="sendMessage">发送</a-button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { sendMessage, getHistory } from '@/api/chat'

export default defineComponent({
    setup() {
        const message = ref('')
        const chatHistory = ref([])

        const sendMessage = async () => {
            try {
                await sendMessage(message.value)
                // 发送消息成功后的处理逻辑
                message.value = ''
            } catch (error) {
                // 处理发送消息失败的逻辑
            }
        }

        const fetchHistory = async () => {
            try {
                const history = await getHistory()
                chatHistory.value = history
            } catch (error) {
                // 处理获取聊天记录失败的逻辑
            }
        }

        onMounted(() => {
            fetchHistory()
        })

        return {
            message,
            chatHistory,
            sendMessage,
        }
    },
})
</script>

<style scoped>
.chat {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.chat-history {
    height: 500px;
    overflow-y: auto;
    margin-bottom: 20px;
}

.chat-input {
    display: flex;
}
</style>