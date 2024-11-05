<script setup lang="ts">
import SidebarElement from '@/components/Sidebar/SidebarElement.vue';
import MessagesSection from '@/components/Messages/MessagesSection.vue';
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
