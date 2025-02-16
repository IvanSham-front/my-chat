<script setup lang="ts">
import { computed, ref, inject, onMounted } from 'vue';

import SearchInput from '@/components/ui/search-input/SearchInput.vue';
import ChatItem from '../chat-item/ChatItem.vue';
import UiScroll from '@/components/ui/scroll/UiScroll.vue';
import PlusIcon from '@/assets/images/PlusIcon.vue';
import { ModalInject } from '@/plugins/modal/modal.types';
import { useChatsStore } from '@/store/chats/chats';
import { useUserStore } from '@/store/users/users';

const chatStore = useChatsStore();
const userStore = useUserStore();

onMounted(() => {
	chatStore.getChatList();
});

const modal = inject<ModalInject>('modal');

const searchValue = ref<string>('');

const filterChatList = computed(() => {
	if (!searchValue.value) {
		return chatStore.list;
	}

	const result = chatStore.list.filter((chat) => {
		const companions = chat.members
			.map((member) => {
				if (member !== '1') {
					return userStore.getUserById(member);
				}
			})
			.filter((item) => item);

		for (const companion of companions) {
			if (!companion) {
				return false;
			}

			if (
				companion.name?.toUpperCase().includes(searchValue.value.toUpperCase()) ||
				companion.surName?.toUpperCase().includes(searchValue.value.toUpperCase()) ||
				`${companion.name} ${companion.surName}`.toUpperCase().includes(searchValue.value.toUpperCase())
			) {
				return true;
			}
		}

		return false;
	});

	return result;
});

const openModal = () => {
	if (modal) {
		modal.open({
			name: 'TestModal',
			props: '',
		});
	} else {
		console.error('Modal injection failed');
	}
};
</script>

<template>
	<div class="chat-list">
		<div class="chat-list__header">
			<SearchInput class="chat-list__search-field" placeholder="search here..." v-model="searchValue" />
			<button class="chat-list__add-button" @click="openModal">
				<PlusIcon />
			</button>
		</div>

		<UiScroll class="chat-list__items">
			<ChatItem v-for="item in filterChatList" :chat-item="item" :key="item.id" />
		</UiScroll>
	</div>
</template>

<style lang="scss" scoped>
	@import './ChatList';
</style>
