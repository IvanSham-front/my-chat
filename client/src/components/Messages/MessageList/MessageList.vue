<script setup>
import UiScroll from '@/components/ui/scroll/UiScroll.vue';
import MessageItem from '../MessageItem/MessageItem.vue';

defineProps({
	messages: {
		type: Array,
		default: () => []
	}
});

</script>

<template>
	<UiScroll class="message-list">
		<MessageItem v-for="message in messages" :key="message.id" :message="message"/>
	</UiScroll>
</template>

<style scoped lang="scss">
@import './MessageList';
</style>