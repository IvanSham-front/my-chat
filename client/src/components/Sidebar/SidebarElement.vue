<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

import UserBlock from '@/components/UserBlock/UserBlock.vue';
import ChatList from '@/components/chats/ChatList/ChatList.vue';
import SettingsIcon from '@/assets/images/SettingsIcon.vue';
import ArrowLeftIcon from '@/assets/images/ArrowLeftIcon.vue';
import UserSettings from '../UseSettings/UserSettings.vue';

const store = useStore();
const mainContentRef = ref(null);
const settingsRef = ref(null);

const authUser = computed(() => store.getters.authUser);

const isShowSettings = computed(() => store.getters.isShowSettings);

const toggleShowSettings = () => {
	store.dispatch('toggleShowSettings');
};

</script>

<template>
	<section class="sidebar">

		<Transition
			name="shrink"
		>
			<div
				class="sidebar__main-content"
				ref="mainContentRef"
				v-show="!isShowSettings"
			>

				<ChatList class="sidebar__chat-list"></ChatList>

				<div class="sidebar__footer">
					<UserBlock
						class="sidebar__user-block"
						:user="authUser"
					/>

					<button
						class="sidebar__settings-button"
						@click="toggleShowSettings"
					>
						<SettingsIcon />
					</button>
				</div>

			</div>		
		</Transition>

		<Transition
			name="slide-left"
		>
			<div
				class="sidebar__settings"
				ref="settingsRef"
				v-show="isShowSettings"
			>
				<div class="sidebar__settings-header">
					<button
						@click="toggleShowSettings"
						class="sidebar__settings-button"
					>
						<ArrowLeftIcon />
					</button>

					<h2>Edit profile</h2>
				</div>

				<UserSettings />
			</div>
		</Transition>
	</section>
</template>

<style
	lang="scss"
	scoped
>
@import "./SidebarElement.scss";
</style>
