<script setup>
import { inject, ref } from 'vue';
import { useStore } from 'vuex';
import CameraIcon from '@/assets/images/CameraIcon.vue';

const modal = inject('modal');
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
		modal.open({
			modalName: 'AvatarUpdater',
			modalProps: {
				photo: fileReader.result
			}
		});
		
	};

	fileReader.readAsDataURL(fileValue);
};


</script>

<template>
	<div class="avatar-uploader">
		<input
			type="file"
			class="avatar-uploader__input"
			accept="image/*"
			ref="fileInputRef"
			@change="onChangeFile"
		/>

		<button
			class="avatar-uploader__controller"
			@click.prevent="openUploader"
		>
			<div class="avatar-uploader__controller-layout">
				<CameraIcon />
			</div>
			<img
				class="avatar-uploader__img"
				:src="avatarSrc"
			/>
		</button>
	</div>
</template>

<style scoped lang="scss">
@import './AvatarUploader.scss';
</style>