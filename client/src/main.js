import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index';
import modal from './plugins/modal';

import routes from './routes';
import socketIo from './plugins/socket.io';


const router = createRouter({
	routes,
	history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(modal, store);
app.use(socketIo, store);

app.mount('#app');
