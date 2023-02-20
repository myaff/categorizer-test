import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './i18n';
import 'virtual:svg-icons-register';
import App from './App.vue';
import './assets/styles/index.styl';

createApp(App).use(createPinia()).use(i18n).mount('#app');
