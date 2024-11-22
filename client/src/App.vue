<script setup lang="ts">
import 'vue3-emoji-picker/css';
import '@/assets/styles/styles.scss';

import { useRouter } from 'vue-router';
import { globalRouter } from './globalRouter';

import ModalMain from './components/modals/ModalMain.vue';

const router = useRouter();
globalRouter.router = router;

</script>

<template>
	<div>
		<RouterView />

		<ModalMain />
	</div>
</template>
