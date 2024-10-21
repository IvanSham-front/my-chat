<script setup lang="ts">
import { computed, ref } from 'vue';

import UserBlock from '@/components/UserBlock/UserBlock.vue';
import ChatList from '@/components/chats/ChatList/ChatList.vue';
import SettingsIcon from '@/assets/images/SettingsIcon.vue';
import ArrowLeftIcon from '@/assets/images/ArrowLeftIcon.vue';
import UserSettings from '../UseSettings/UserSettings.vue';
import { useAuth } from '@/hooks/useAuth';
import { useSidebarStore } from '@/store/sidebar/sidebar';

const { authUser } = useAuth();

const mainContentRef = ref(null);
const settingsRef = ref(null);

const sidebarStore  = useSidebarStore();

const toggleShowSettings = () => {
	sidebarStore.toggleShowSettings();
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
				v-show="!sidebarStore.isShowSettings"
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
				v-show="sidebarStore.isShowSettings"
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
