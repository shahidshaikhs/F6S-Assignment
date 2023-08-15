<template>
    <div class="compose">
        <textarea @keydown.enter.exact.prevent="sendReply" v-model="message" placeholder="Type your message here..."></textarea>
        <button @click="sendReply"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                viewBox="0 0 256 256">
                <path
                    d="M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L110,149.81a8,8,0,0,0-3.8-3.8L20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z"
                    opacity="0.2"></path>
                <path
                    d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.42,29.84l85.62,40.55,40.55,85.62A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14L118.42,148.9l47.24-47.25a8,8,0,0,0-11.31-11.31L107.1,137.58,24,98.22l.14,0L216,40Z">
                </path>
            </svg></button>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore();
const currentUser = store.state.mockApi.currentUser;
const conversation = store.state.mockApi.conversation;
const message = ref("");

const sendReply = () => {
    if (!message.value.length <= 0) {

        const newMessageContent = message.value;
        const newMessage = {
            id: conversation.length + 1,
            from: currentUser.firstName.toLowerCase(),
            message: newMessageContent,
            date: new Date().toISOString(),
        };

        store.dispatch('mockApi/simulateReply', newMessage).then(() => {
            message.value = "";
        }).catch((err) => {

        });
    }
}
</script>
<style lang="scss">
.compose {
    margin-top: 8px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 12px;

    textarea {
        min-height: 23px;
        border-radius: 10px;
        border: 1px solid #d8d8d8;
        width: 100%;
        padding: 4px 8px;
        max-height: 60px;
        overflow-y: auto;
        resize: none;
    }

    button {
        background: none;
        border: none;
        width: 60px;
        cursor: pointer;
    }
}
</style>