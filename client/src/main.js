import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index';
import myPlugin from './plugins/modal';

import routes from './routes';


const router = createRouter({
	routes,
	history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(myPlugin, store);

app.mount('#app');
