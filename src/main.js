import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import routes from '~pages';
import { createPinia } from 'pinia';
import VueCookies from 'vue-cookies';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(VueCookies, { expires: '7d' });
app.use(router);
app.use(createPinia());
app.mount('#app');
