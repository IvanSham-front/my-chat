import ChatPage from '@/pages/chat/ChatPage.vue';
import SignupPage from '@/pages/signup/SignupPage.vue';
import SigninPage from '@/pages/signin/SigninPage.vue';

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
