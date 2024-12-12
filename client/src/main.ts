import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import modal from './plugins/modal/modal';

import routes from './routes';
import authMiddleware from './middleware/auth';

const router = createRouter({
	routes,
	history: createWebHistory(),
});

router.beforeEach(authMiddleware);

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(modal);

app.mount('#app');
