import { defineStore } from 'pinia';
import { App } from 'vue';
import { ModalState, OpenModalPayload } from './modal.types';

export const useModalStore = defineStore('modals', {
	state: (): ModalState => ({
		isOpen: false,
		name: '',
		props: null,
	}),

	actions: {
		openModal({ name, props }: OpenModalPayload) {
			this.isOpen = true;
			this.name = name;
			this.props = props;
		},

		closeModal() {
			this.isOpen = false;
			setTimeout(() => {
				this.name = '';
				this.props = null;
			}, 300);
		},
	},
});

export default {
	install(app: App) {
		const modalStore = useModalStore();

		app.config.globalProperties.$modal = {
			open({ name, props }) {
				modalStore.openModal({ name, props });
			},

			close() {
				modalStore.closeModal();
			},
		};

		app.provide('modal', app.config.globalProperties.$modal);
	},
};
