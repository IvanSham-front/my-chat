<script setup>
import SearchIcon from '@/assets/images/SearchIcon.vue';

defineProps({
	type: {
		type: String,
		default: 'text',
	},

	placeholder: String,
});
</script>

<template>
	<div class="base-input">
		<SearchIcon />
		<input
			:type="type"
			:placeholder="placeholder"
		/>
	</div>
</template>

<style lang="scss" scoped>@import './SearchInput.scss';</style>
