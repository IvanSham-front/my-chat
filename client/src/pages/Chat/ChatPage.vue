<script setup>
import SidebarElement from '@/components/chat/Sidebar/SidebarElement.vue';
</script>

<template>
	<main class="chat">
		<SidebarElement />
		<section class="chat__messages">messages</section>
	</main>
</template>

<style
	lang="scss"
	scoped
>
@import './ChatPage.scss';
</style>
