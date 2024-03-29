export default {
	install(app, store) {
		
		if (!store.hasModule('modals')) {

			const storeModule = {

				state: {
					openModal: false,
					modalName: '',
					modalProps: null,
				},

				mutations: {
					open_modal(state, payload) {
						state.openModal = true;
						state.modalName = payload.modalName;
						state.modalProps = payload.modalProps;
					},
					close_modal(state) {
						state.openModal = false;
						setTimeout(() => {
							state.modalName = '';
							state.modalProps = null;
						}, 300);
					},
				},

				actions: {
					openModal({ commit }, payload) {
						commit('open_modal', payload);
					},
					closeModal({ commit }) {
						commit('close_modal');
					},
				},

				getters: {
					openModal: (state) => state.openModal,
					modalName: (state) => state.modalName,
					modalProps: (state) => state.modalProps,
				},
			};

			store.registerModule( 'modals', storeModule);

		}

		app.config.globalProperties.$modal = {

			open({ modalName, modalProps }) {
				store.dispatch('openModal', { modalName, modalProps });
			},

			close() {
				store.dispatch('closeModal');
			}

		};

		app.provide('modal', app.config.globalProperties.$modal);

	},
	
};
