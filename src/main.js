import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt';

// Event Bus
const emitter = mitt();

// Vuex store
import store from './store';

const app = createApp(App)

app.config.globalProperties.emitter = emitter;

app.use(router)

app.use(store)

app.mount('#app')
