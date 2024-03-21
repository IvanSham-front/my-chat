import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index';

import routes from './routes';

const router = createRouter({
	routes,
	history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');
