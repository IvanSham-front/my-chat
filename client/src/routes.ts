import ChatPage from '@/pages/Chat/ChatPage.vue';
import SignupPage from '@/pages/Signup/SignupPage.vue';
import SigninPage from './pages/Signin/SigninPage.vue';

const routes = [
	{ path: '/', component: ChatPage },
	{ path: '/signup', component: SignupPage },
	{ path: '/signin', component: SigninPage },
];

export default routes;
