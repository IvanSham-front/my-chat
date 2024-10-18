<script setup lang="ts">

import { computed, inject } from 'vue';
import { useStore } from 'vuex';
import TestModal from './ModalTest/TestModal.vue';
import AvatarUpdater from './AvatarUpdater/AvatarUpdater.vue';
const store = useStore();
const modal = inject('modal');

const components = {
	TestModal,
	AvatarUpdater
};

const openModal = computed(() => store.getters.openModal);
const modalName = computed(() => store.getters.modalName);


const closeModal = () => {
	modal.close();
};

</script>

<template>
	<transition 
		name="fade"
	>
		<div class="modal" v-show="openModal">
			<div class="modal__overlay" @click="closeModal"></div>
			<div class="modal__content">
				<component :is="components[modalName]"></component>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
	@import './ModalMain.scss';
</style>
