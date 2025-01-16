<script setup lang="ts">
import SidebarElement from '@/components/Sidebar/SidebarElement.vue';
import MessagesSection from '@/components/messages/MessagesSection.vue';
import { useAuth } from '@/hooks/useAuth';
import { onBeforeMount } from 'vue';

const { connectSocket } = useAuth();

onBeforeMount( () => {
	console.debug('chatPage');
	connectSocket();
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
