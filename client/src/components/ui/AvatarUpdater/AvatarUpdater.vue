<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import CameraIcon from '@/assets/images/CameraIcon.vue';

const store = useStore();

const fileInputRef = ref(null);

const avatarSrc = ref(store.getters.authUser.avatarUrl);


const openUploader = () => {
	fileInputRef.value.click();
};

const onChangeFile = (e) => {
	const fileValue = e.target.files[0];
	const fileReader = new FileReader();
	fileReader.onload = function () {
		avatarSrc.value = fileReader.result;
		
	};

	fileReader.readAsDataURL(fileValue);
};

</script>

<template>
	<div class="avatar-updater">
		<input
			type="file"
			class="avatar-updater__input"
			accept="image/*"
			ref="fileInputRef"
			@change="onChangeFile"
		/>

		<button
			class="avatar-updater__controller"
			@click.prevent="openUploader"
		>
			<div class="avatar-updater__controller-layout">
				<CameraIcon />
			</div>
			<img
				class="avatar-updater__img"
				:src="avatarSrc"
			/>
		</button>
	</div>
</template>

<style scoped lang="scss">
@import './AvatarUpdater.scss';
</style>