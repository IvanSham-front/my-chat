const colors = ['#FFADAD', '#FFD6A5', '#FFD6A5', '#f2cc8f', '#06d6a0', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];

export default {
	state: {
		list: colors
	},
	getters: {
		colorsList (state) {
			return state.list;
		}
	}
};