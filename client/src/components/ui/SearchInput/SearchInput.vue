<script setup lang="ts">
import SearchIcon from '@/assets/images/SearchIcon.vue';

const searchValue = defineModel();

defineProps({
	placeholder: String,

});
</script>

<template>
	<div class="search-input">
		<div class="search-input__icon">
			<SearchIcon />
		</div>
		<input
			type="text"
			:placeholder="placeholder"
			v-model="searchValue"
		/>
	</div>
</template>

<style lang="scss" scoped>@import './SearchInput.scss';</style>
