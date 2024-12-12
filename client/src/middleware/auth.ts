import { useUserStore } from '@/store/users/users';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default async function authMiddleware(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	const userStore = useUserStore();

	if (to.meta.requiresAuth && !userStore.authUser) {
		const user = await userStore.getAuthUser();

		if (user) {
			return next();
		}

		return next('/signin');
	}

	return next();
}
