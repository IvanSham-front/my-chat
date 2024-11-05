import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import modal from './plugins/modal/modal';

import routes from './routes';
// import socketIo from './plugins/socket.io/socket.io';

const router = createRouter({
	routes,
	history: createWebHistory(),
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(modal);
// app.use(socketIo);

app.mount('#app');
