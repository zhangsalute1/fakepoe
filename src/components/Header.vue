<template>
    <a-layout-header>
        <a-menu mode="horizontal" theme="light">
            <a-menu-item key="home">
                <router-link to="/">首页</router-link>
            </a-menu-item>
            <a-menu-item key="login">
                <router-link to="/login">登录</router-link>
            </a-menu-item>
            <a-menu-item key="register">
                <router-link to="/register">注册</router-link>
            </a-menu-item>
            <a-menu-item key="activation-code">
                <router-link to="/activation-code">激活码</router-link>
            </a-menu-item>
            <a-menu-item key="chat">
                <router-link to="/chat">聊天</router-link>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
import { defineComponent } from 'vue'
import { Layout, Menu } from 'ant-design-vue';

export default defineComponent({
    components: {
        'a-layout-header': Layout.Header,
        'a-menu': Menu,
        'a-menu-item': Menu.Item,
    },
    setup() {
        return {}
    },
})
</script>

<style scoped>
/* 根据需要添加或修改样式 */
</style>