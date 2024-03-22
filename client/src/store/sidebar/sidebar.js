export default {
	state: {
		isShowSettings: false,
	},
	mutations: {
		toggle_show_settings(state) {
			state.isShowSettings = !state.isShowSettings;
		},
		set_show_settings(state, payload) {
			state.isShowSettings = payload;
		},
	},
	actions: {
		toggleShowSettings(context) {
			context.commit('toggle_show_settings');
		},
		setShowSettings(context, payload) {
			context.commit('set_show_settings', payload);
		},
	},
	getters: {
		isShowSettings(state) {
			return state.isShowSettings;
		},
	},
};