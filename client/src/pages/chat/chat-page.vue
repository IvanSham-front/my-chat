<script setup lang="ts">
import SidebarElement from '@/components/sidebar/sidebar-element.vue';
import MessagesSection from '@/components/messages/messages-section.vue';
import { useAuth } from '@/hooks/useAuth';
import { useChatsStore } from '@/store/chats/chats';
import { onBeforeMount } from 'vue';

const { connectSocket } = useAuth();
const chatStore = useChatsStore();

onBeforeMount( async  () => {

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
	@import './chat-page.scss';
</style>
