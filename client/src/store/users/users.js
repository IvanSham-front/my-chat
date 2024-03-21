const users = [
	{
		id: 1,
		login: '@ivan',
		name: 'Ivan',
		surName: 'Shamenkov',
		status: '',
		avatarUrl: '',
		isOnline: true,
	},
	{
		id: 2,
		login: '@anna_sham',
		name: 'Anna',
		surName: 'Shamenkova',
		status: 'My life my rules',
		avatarUrl: 'https://img.freepik.com/premium-photo/3d-cat-avatar-online-games-web-account-avatar_147351-46.jpg',
		isOnline: false,
	},
	{
		id: 3,
		login: '@visuke',
		name: 'Alexey',
		surName: 'Posdnyakov',
		status: '',
		avatarUrl: '',
		isOnline: false,
	},
	{
		id: 4,
		login: '@visuke',
		name: 'Alexey',
		surName: 'Onuchin',
		status: '',
		avatarUrl: '',
		isOnline: false,
	},
	{
		id: 5,
		login: '@SoftCreator',
		name: 'Soft',
		surName: 'Creator',
		status: '',
		avatarUrl: '',
		isOnline: false,
	},
	{
		id: 6,
		login: '@imxoiam',
		name: 'Max',
		surName: 'Khoroshev',
		status: '',
		avatarUrl: '',
		isOnline: false,
	},
];

export default {
	state: {
		list: users,
	},
	mutations: {
		set_list(state, payload) {
			state.list = payload;
		},
	},
	actions: {
		setUsersList(context, payload) {
			context.commit('set_list', payload);
		},
	},
	getters: {
		getUserById: (state) => (id) => {
			const user = state.list.find((item) => item.id === id);
			return user || null;
		},
	},
};
