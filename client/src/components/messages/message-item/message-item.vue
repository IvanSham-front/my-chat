<script setup lang="ts">
import { MessageDB } from '@/types/Message';

defineProps<{
	message: MessageDB;
}>();

const sellerId = 1;
</script>

<template>
	<div class="message-item" :class="{ 'message-item_from-me': sellerId === 1 }">
		<div class="message-item__content" :class="{ 'message-item__content_from-me': sellerId === 1 }">
			<div class="message-item__attachment" v-if="message.type === 'attachment'"></div>

			<p class="message-item__text">{{ message.text }}</p>

			<span class="message-item__date">{{ message.createdAt }}</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './message-item.scss';
</style>
