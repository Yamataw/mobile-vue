import { createApp } from 'vue'
import App from './App.vue'
import '../src/assets/style.css'
import router from "./router";

createApp(App).use(router).mount('#app')

