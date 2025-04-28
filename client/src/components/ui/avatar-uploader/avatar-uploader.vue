<script setup lang="ts">
import { inject, ref } from 'vue';
import CameraIcon from '@/assets/images/camera-icon.vue';
import { ModalInject } from '@/plugins/modal/modal.types';
import { useAuth } from '@/hooks/useAuth';

const modal = inject<ModalInject>('modal');

const { authUser } = useAuth();

const fileInputRef = ref<HTMLInputElement | null>(null);

const openUploader = () => {
	if (fileInputRef.value) {
		fileInputRef.value.click();
	} else {
		console.error('file input ref is undefined');
	}
};

const onChangeFile = (e: Event) => {
	const target = e.target as HTMLInputElement;

	if (target.files && target.files.length && modal) {
		const fileValue = target.files[0];
		const fileReader = new FileReader();

		fileReader.onload = function () {
			modal.open({
				name: 'AvatarUpdater',
				props: {
					photo: fileReader.result,
				},
			});
		};

		fileReader.readAsDataURL(fileValue);
	}
};
</script>

<template>
	<div class="avatar-uploader">
		<input type="file" class="avatar-uploader__input" accept="image/*" ref="fileInputRef" @change="onChangeFile" />

		<button class="avatar-uploader__controller" @click.prevent="openUploader">
			<div class="avatar-uploader__controller-layout">
				<CameraIcon />
			</div>
			<img class="avatar-uploader__img" :src="authUser?.avatarUrl" />
		</button>
	</div>
</template>

<style scoped lang="scss">
	@import './avatar-uploader.scss';
</style>
