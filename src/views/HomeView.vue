<template>
  <main>
    <section class="chat-container">
      <Conversations :message="eventMessage"/>
      <Compose @trigger-event="handleEvent"/>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue';

import Conversations from '../components/Conversations.vue'
import Compose from '../components/Compose.vue'

const eventMessage = ref('');

const handleEvent = msg => {
  eventMessage.value = msg;
};
</script>
<style lang="scss">
main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e2;

  .chat-container {
    width: 100%;
    max-width: 700px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.234);
    padding: 10px;
  }
}
</style>
