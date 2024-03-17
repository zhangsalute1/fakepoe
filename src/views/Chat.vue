<template>
    <div class="chat">
        <a-list class="messages" :data-source="messages" :bordered="false">
            <template #renderItem="{ item }">
                <a-list-item :class="item.role">
                    <a-typography>
                        <a-typography-paragraph>{{ item.content }}</a-typography-paragraph>
                    </a-typography>
                </a-list-item>
            </template>
        </a-list>
        <div class="input-box">
            <a-input v-model:value="newMessage" placeholder="Type your message..." />
            <a-button type="primary" @click="sendMessage">Send</a-button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

export default {
    setup() {
        const messages = ref([]);
        const newMessage = ref('');

        const sendMessage = async () => {
            const userMessage = {
                role: 'user',
                content: newMessage.value,
            };
            messages.value.push(userMessage);
            newMessage.value = '';

            try {
                const response = await axios.post('/chat', {
                    model: 'gpt-3.5-turbo',
                    messages: messages.value,
                });
                const assistantMessage = {
                    role: 'assistant',
                    content: response.data.message,
                };
                messages.value.push(assistantMessage);
            } catch (error) {
                console.error('Error:', error);
                message.error('An error occurred while sending the message.');
            }
        };

        return {
            messages,
            newMessage,
            sendMessage,
        };
    },
};
</script>

<style scoped>
.chat {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.messages {
    flex: 1;
    overflow-y: auto;
}

.input-box {
    display: flex;
    margin-top: 16px;
}

.input-box .ant-input {
    flex: 1;
    margin-right: 8px;
}
</style>