import { defineStore } from "pinia";

export const useSidebarStore = defineStore( 'sidebar', {

	state: () => ({ isShowSettings: false }),

	actions: {

		toggleShowSettings() {

			this.isShowSettings = !this.isShowSettings;

		},

	}

} );