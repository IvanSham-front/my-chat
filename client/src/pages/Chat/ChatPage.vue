<script setup lang="ts">
import SidebarElement from '@/components/Sidebar/SidebarElement.vue';
import MessagesSection from '@/components/messages/MessagesSection.vue';
import { useAuth } from '@/hooks/useAuth';
import { useChatsStore } from '@/store/chats/chats';
import { onBeforeMount } from 'vue';

const { connectSocket } = useAuth();
const chatStore = useChatsStore();

onBeforeMount( async  () => {
	console.debug('chatPage');
	await connectSocket();
	chatStore.getChatList();
});

</script>

<template>
	<main class="chat">
		<SidebarElement />
		<MessagesSection />
	</main>
</template>

<style lang="scss" scoped>
	@import './ChatPage.scss';
</style>
