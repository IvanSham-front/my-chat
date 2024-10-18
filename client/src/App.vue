<script setup lang="ts">
import 'vue3-emoji-picker/css';
import '@/assets/styles/styles.scss';

import ModalMain from './components/modals/ModalMain.vue';

</script>

<template>
	<div>
		<RouterView></RouterView>
		
		<ModalMain/>
	</div>
</template>
