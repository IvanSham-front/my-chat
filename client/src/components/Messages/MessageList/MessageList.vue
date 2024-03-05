<script setup>
import { inject } from 'vue';
import UiScroll from '@/components/ui/scroll/UiScroll.vue';
import MessageItem from '../MessageItem/MessageItem.vue';

defineProps({
	messages: {
		type: Array,
		default: () => []
	}
});

const messageListRef = inject('messageListRef', null);


</script>

<template>
	<div
		ref="messageListRef"
		class="message-list"
	>
		<UiScroll class="message-list__scroll">
			<MessageItem
				v-for="message in messages"
				:key="message.id"
				:message="message"
			/>
		</UiScroll>
	</div>
</template>

<style scoped lang="scss">
@import './MessageList';
</style>