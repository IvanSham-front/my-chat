<script setup>
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';

import UserBlock from '@/components/UserBlock/UserBlock.vue';
import ChatList from '@/components/chats/ChatList/ChatList.vue';
import ChatLogo from '@/assets/images/ChatLogo.vue';
import PlusIcon from '@/assets/images/PlusIcon.vue';
import SettingsIcon from '@/assets/images/SettingsIcon.vue';

const store = useStore();
const mainContentRef = ref(null);
const settingsRef = ref(null);

const userObject = {

	id: 1,
	login: '@ivan00v',
	name: 'Ivan',
	surName: 'Shamenkov',
	status: 'My life my rules',
	avatarUrl: 'https://img.freepik.com/premium-photo/3d-cat-avatar-online-games-web-account-avatar_147351-46.jpg',
	isOnline: false,

};

const isShowSettings = computed(() => store.getters.isShowSettings);

const delayIsShowSettings = ref(isShowSettings.value);

const toggleShowSettings = () => {
	store.dispatch('toggleShowSettings');
};

watch(isShowSettings, (newValue, oldValue) => {

	if (!oldValue) {
		mainContentRef.value.classList.add('animation-shrink');
		settingsRef.value.classList.add('sidebar__settings_show');
		setTimeout(() => {
			delayIsShowSettings.value = newValue;
		}, 200);

	} else {
		delayIsShowSettings.value = newValue;
		mainContentRef.value.classList.add('animation-grow');
		settingsRef.value.classList.remove('sidebar__settings_show');
	}

	setTimeout(() => {
		mainContentRef.value.classList.remove('animation-grow');
		mainContentRef.value.classList.remove('animation-shrink');
	}, 500);
});

</script>

<template>
	<section class="sidebar">

		<div
			class="sidebar__main-content"
			ref="mainContentRef"
			v-show="!delayIsShowSettings"
		>
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

				<button
					class="sidebar__settings-button"
					@click="toggleShowSettings"
				>
					<SettingsIcon />
				</button>
			</div>

		</div>

		<div
			class="sidebar__settings"
			ref="settingsRef"
		>
			<button @click="toggleShowSettings">@back</button>

			<h1>BIG SETTINGS</h1>
		</div>

	</section>
</template>

<style
	lang="scss"
	scoped
>
@import "./SidebarElement.scss";
</style>
