<script setup lang="ts">
import { inject, onMounted, watch } from 'vue';
import UiScroll from '@/components/ui/scroll/UiScroll.vue';
import MessageItem from '../message-item/MessageItem.vue';
import { MessageDB } from '@/types/Message';


const props = defineProps<{
	messages: MessageDB[];
}>();


const messageListRef = inject('messageListRef', null);

function onScrollList( behavior: 'auto' | 'smooth' ) {
	const scrollList = document.getElementById('scrollList');
	if ( scrollList ) {

		const height = scrollList.scrollHeight;

		setTimeout(() => {
			scrollList.scrollBy({
				left: 0,
				top: height,
				behavior,
			});
		});

	}

}

onMounted(() => {
	onScrollList('auto');
});

watch(props.messages, () => {
	onScrollList('smooth');
});
</script>

<template>
	<div ref="messageListRef" class="message-list">
		<UiScroll id="scrollList" class="message-list__scroll">
			<MessageItem v-for="message in messages" :key="message.id" :message="message" />
		</UiScroll>
	</div>
</template>

<style scoped lang="scss">
	@import './MessageList';
</style>
