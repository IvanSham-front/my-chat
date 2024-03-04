<script setup>
import UserBlock from '@/components/UserBlock/UserBlock.vue';
import ChatList from '@/components/chats/ChatList/ChatList.vue';

import ChatLogo from '@/assets/images/ChatLogo.vue';
import PlusIcon from '@/assets/images/PlusIcon.vue';
import SettingsIcon from '@/assets/images/SettingsIcon.vue';

const userObject = {

	id: 1,
	login: '@ivan00v',
	name: 'Ivan',
	surName: 'Shamenkov',
	status: 'My life my rules',
	avatarUrl: 'https://img.freepik.com/premium-photo/3d-cat-avatar-online-games-web-account-avatar_147351-46.jpg',
	isOnline: false,

};

</script>

<template>
	<section class="sidebar">
		<header class="sidebar__header">
			<div class="sidebar__project-info project-info">
				<div class="sidebar__logo">
					<ChatLogo />
				</div>
				<div class="project-info__desc">
					<h2 class="sidebar__title">MyChat</h2>
					<span class="project-info__version">v-0.1 beta</span>
				</div>
			</div>

			<div class="sidebar__actions">
				<button class="sidebar__action-button">
					<PlusIcon />
				</button>
			</div>
		</header>

		<ChatList class="sidebar__chat-list"></ChatList>

		<div class="sidebar__footer">
			<UserBlock
				class="sidebar__user-block"
				:user="userObject"
			/>

			<button class="sidebar__settings-button">
				<SettingsIcon />
			</button>
		</div>

	</section>
</template>

<style
	lang="scss"
	scoped
>
@import "./SidebarElement.scss";
</style>
