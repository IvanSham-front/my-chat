import ChatPage from '@/pages/chat/chat-page.vue';
import SignupPage from '@/pages/signup/signup-page.vue';
import SigninPage from '@/pages/signin/signin-page.vue';

const routes = [
	{
		path: '/',
		component: ChatPage,
		meta: {
			requiresAuth: true,
		},
	},
	{ path: '/signup', component: SignupPage },
	{ path: '/signin', component: SigninPage },
];

export default routes;
