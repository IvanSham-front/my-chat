<script setup>
	const props = defineProps({
		type: {
			type: String,
			default: "text",
		},

		placeholder: String,
	});
</script>

<template>
	<div class="base-input">
		<slot></slot>
		<input :type="type" :placeholder="placeholder" />
	</div>
</template>

<style lang="scss" scoped>
	@import "./BaseInput.scss";
</style>
