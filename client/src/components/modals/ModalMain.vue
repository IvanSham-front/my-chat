<script setup lang="ts">
import { DefineComponent, inject } from 'vue';
import { ModalInject } from '@/plugins/modal/modal.types';
import { useModalStore } from '@/plugins/modal/modal';
import AvatarUpdater from './avatar-updater/AvatarUpdater.vue';

const modal = inject<ModalInject>('modal');

const components: { [key: string]: DefineComponent<{}, {}, any> } = {
	// TestModal,
	AvatarUpdater,
};

const modalStore = useModalStore();

const closeModal = () => {
	if (modal) {
		modal.close();
	} else {
		console.error('Modal injection failed');
	}
};
</script>

<template>
	<transition name="fade">
		<div class="modal" v-show="modalStore.isOpen">
			<div class="modal__overlay" @click="closeModal"></div>
			<div class="modal__content">
				<component :is="components[modalStore.name]"></component>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
	@import './ModalMain.scss';
</style>
