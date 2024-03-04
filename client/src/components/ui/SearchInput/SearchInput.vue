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
	<div class="search-input">
		<div class="search-input__icon">
			<SearchIcon />
		</div>
		<input
			:type="type"
			:placeholder="placeholder"
		/>
	</div>
</template>

<style lang="scss" scoped>@import './SearchInput.scss';</style>
