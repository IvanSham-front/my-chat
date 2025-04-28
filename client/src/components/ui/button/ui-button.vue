<script lang="ts" setup>

import { ButtonHTMLAttributes } from 'vue';

export interface BtnHTMLAttr extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<BtnHTMLAttr>();

const emit = defineEmits(['click']);

const onClick = () => {
	emit('click');
};
</script>

<template>
	<button class="ui-button" @click="onClick">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
@import './ui-button.scss';
</style>
