<template>
    <div class="chat">
        <a-list class="messages" :data-source="messages" :bordered="false">
            <template #renderItem="{ item }">
                <a-list-item :class="['message', item.role]">
                    <a-typography>
                        <a-typography-paragraph>
                            <strong>{{ item.role === 'user' ? 'You' : selectedModel }}</strong>
                            <span class="timestamp">{{ item.timestamp }}</span>
                        </a-typography-paragraph>
                        <a-typography-paragraph>{{ item.content }}</a-typography-paragraph>
                    </a-typography>
                </a-list-item>
            </template>
        </a-list>
        <div class="input-box">
            <a-select v-model:value="selectedModel" style="width: 120px" :options="modelOptions" />
            <a-input v-model:value="newMessage" :placeholder="'与 ' + selectedModel + ' 模型交流...'"
                @keyup.enter="sendMessage" />
            <a-button type="primary" @click="sendMessage" :loading="loading">发送</a-button>
            <a-tooltip title="Clear Context">
                <a-button shape="circle" icon="清空" @click="clearContext" />
            </a-tooltip>
        </div>
        <div class="error-message" v-if="errorMessage">
            <a-alert :message="errorMessage" type="error" showIcon />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

export default {
    setup() {
        const messages = ref([]);
        const newMessage = ref('');
        const selectedModel = ref('gpt-3.5-turbo');
        const loading = ref(false);
        const errorMessage = ref('');

        const modelOptions = [
            { value: 'gpt-3.5-turbo', label: 'GPT-3.5' },
            { value: 'gpt-4', label: 'GPT-4' },
        ];

        const sendMessage = async () => {
            if (newMessage.value.trim() === '') return;

            const userMessage = {
                role: 'user',
                content: newMessage.value,
                timestamp: new Date().toLocaleString(),
            };
            messages.value.push(userMessage);
            newMessage.value = '';
            loading.value = true;
            errorMessage.value = '';

            try {
                const response = await axios.post('/chat', {
                    model: selectedModel.value,
                    messages: messages.value,
                });
                const assistantMessage = {
                    role: 'assistant',
                    content: response.data.message,
                    timestamp: new Date().toLocaleString(),
                };
                messages.value.push(assistantMessage);
            } catch (error) {
                console.error('Error:', error);
                errorMessage.value = 'An error occurred while sending the message.';
            }

            loading.value = false;
        };

        const clearContext = () => {
            messages.value = [];
            message.info('Context cleared.');
        };

        const loadChatHistory = () => {
            // 从本地存储加载聊天历史记录
            const storedMessages = localStorage.getItem('chatHistory');
            if (storedMessages) {
                messages.value = JSON.parse(storedMessages);
            }
        };

        const saveChatHistory = () => {
            // 将聊天历史记录保存到本地存储
            localStorage.setItem('chatHistory', JSON.stringify(messages.value));
        };

        onMounted(() => {
            loadChatHistory();
        });

        return {
            messages,
            newMessage,
            selectedModel,
            modelOptions,
            loading,
            errorMessage,
            sendMessage,
            clearContext,
        };
    },

    unmounted() {
        saveChatHistory();
    },
};
</script>

<style scoped>
.chat {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px);
    padding: 16px;
}

.messages {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.message {
    max-width: 100%;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
}

.user {
    align-self: flex-end;
    /* background-color: #1890ff; */
    color: white;
}

.assistant {
    align-self: flex-start;
    background-color: #f0f0f0;
}

.timestamp {
    margin-left: 8px;
    font-size: 12px;
    color: #999;
}

.input-box {
    display: flex;
    align-items: center;
    margin-top: 16px;
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 8px 0;
}

.input-box .ant-select {
    margin-right: 8px;
}

.input-box .ant-input {
    flex: 1;
    margin-right: 8px;
}

.error-message {
    margin-top: 16px;
}
</style>