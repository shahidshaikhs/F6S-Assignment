<template>
    <div class="conversation" ref="conversationsContainer">
        <ul>
            <li v-for="message in conversation" :key="message.id" :class="{ sent: isMessageFromCurrentUser(message) }">
                <div class="author-img">
                    <div class="author-name">{{ message.from }}</div>
                </div>
                <div class="message-bubble">
                    {{ message.message }}
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref, watch, onMounted } from 'vue';
const store = useStore();
const currentUser = store.state.mockApi.currentUser;
const conversation = store.state.mockApi.conversation;
const conversationsContainer = ref()

const isMessageFromCurrentUser = (message) => {
    return message.from === currentUser.firstName.toLowerCase();
};

watch(conversation, () => {
    setTimeout(() => {
        conversationsContainer.value.scrollTop = conversationsContainer.value.scrollHeight
    }, 1);
});

onMounted(() => {
    conversationsContainer.value.scrollTop = conversationsContainer.value.scrollHeight
})

</script>
<style lang="scss">
.conversation {
    border: 1px solid #d8d8d8;
    padding: 20px;
    border-radius: 10px;
    height: 400px;
    overflow-y: auto;

    ul {
        display: flex;
        flex-direction: column;
        gap: 10px;

        li {
            display: flex;
            align-items: flex-end;
            width: 100%;
            max-width: 60%;
            gap: 12px;

            &:last-child {
                .author-img {
                    .author-name {
                        bottom: 0;
                    }
                }
            }

            .author-img {
                height: 48px;
                width: 48px;
                background-color: #d4d4d4;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                position: relative;
                text-transform: capitalize;

                &::after {
                    content: "";
                    height: 24px;
                    width: 24px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23000000' viewBox='0 0 256 256'%3E%3Cpath d='M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z'%3E%3C/path%3E%3C/svg%3E");
                }

                .author-name {
                    display: none;
                    position: absolute;
                    font-size: 14px;
                    background-color: white;
                    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.3);
                    border-radius: 4px;
                    padding: 4px 12px;
                    left: 0;
                    bottom: -34px;
                    z-index: 10;
                }

                &:hover {
                    .author-name {
                        display: block;
                    }
                }
            }

            .message-bubble {
                background-color: #d7d7d7;
                padding: 8px;
                border-radius: 8px;
                white-space: pre-line;
            }
        }

        li.sent {
            flex-direction: row-reverse;
            align-self: flex-end;

            .message-bubble {
                background-color: #7dd3fc;
            }
        }
    }

    /* width */
    &::-webkit-scrollbar {
        width: 6px;
        height: 50px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f4f7f900;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #9E9E9E;
        border-radius: 20px;
    }
}
</style>