import { useUserStore } from '@/store/users/users';
import { storeToRefs } from 'pinia';

export const useAuth = () => {
	const userStore = useUserStore();

	const { authUser } = storeToRefs(userStore);

	return {
		authUser: authUser,
	};
};
