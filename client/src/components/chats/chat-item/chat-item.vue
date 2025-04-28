<script setup lang="ts">
import { computed, onMounted } from 'vue';
import UiAvatar from '@/components/ui/avatar/ui-avatar.vue';
import { useChatsStore } from '@/store/chats/chats';
import { storeToRefs } from 'pinia';
import { ChatDB } from '@/types/Chat';
import { useUserStore } from '@/store/users/users';
import { UserDB } from '@/types/User';
import { useAuth } from '@/hooks/useAuth';

const props = defineProps<{
	chatItem: ChatDB;
}>();

const chatStore = useChatsStore();
const { currentChat } = storeToRefs(chatStore);

const usersStore = useUserStore();

const { authUser } = useAuth();

function lastMessageSmall(string: string) {
	if (string.length > 30) {
		return string.slice(0, 30) + '...';
	}
	return string;
}

const isActive = computed<boolean>(() => {
	if (!currentChat.value) {
		return false;
	}
	return currentChat.value?.id === props.chatItem.id;
});

const companion = computed<UserDB | null>(() => {

	if (!authUser.value) {
		return null;
	}

	const companionId = props.chatItem.members.find((item) => item !== authUser.value?.id);

	if (companionId) {
		return usersStore.getUserById(companionId);
	} else {
		return null;
	}
});

const companionFullName = computed<string>(() => {

	return companion.value 
		? usersStore.fullNameById( companion.value?.id  ) 
		: '';

});

const selectCurrentChat = (chat: ChatDB) => {
	chatStore.selectCurrentChat(chat);
};

onMounted(async () => {
	
	const membersToFetch = props.chatItem.members.filter(
		( member ) => !usersStore.getUserById(member)
	);

	await Promise.all(
		membersToFetch.map((member) => usersStore.findUserById(member))
	);

});

</script>

<template>
	<div class="chat-item" :class="{ 'chat-item_active': isActive }" @click="selectCurrentChat(chatItem)">
		<UiAvatar class="chat-item__avatar" :user="companion" />

		<div class="chat-item__description">
			<h4 class="chat-item__name">
				{{ companionFullName }}
			</h4>

			<span class="chat-item__last-message">
				{{ lastMessageSmall(chatItem.lastMessage.text || '') }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './chat-item.scss';
</style>
