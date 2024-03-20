<script setup>

defineProps({
	message: {
		type: Object,
		required: true
	}
});

</script>

<template>
	<div
		class="message-item"
		:class="{ 'message-item_from-me': message.sellerId === 1 }"
	>
		<div
			class="message-item__content"
			:class="{ 'message-item__content_from-me': message.sellerId === 1 }"
		>
			<div
				class="message-item__attachment"
				v-if="message.attachment"
			></div>

			<p class="message-item__text">{{ message.text }}</p>

			<span class="message-item__date">{{ message.date }}</span>
		</div>
	</div>
</template>

<style
	lang="scss"
	scoped
>
@import './MessageItem.scss';
</style>