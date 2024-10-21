<script setup lang="ts">
import { computed } from 'vue';
import UiAvatar from '@/components/ui/avatar/UiAvatar.vue';
import { useChatsStore } from '@/store/chats/chats';
import { storeToRefs } from 'pinia';
import { ChatDB } from '@/types/Chat';
import { useUserStore } from '@/store/users/users';
import { UserDB } from '@/types/User';


const props = defineProps<{
	chatItem: ChatDB
}>()

const chatStore = useChatsStore();
const { currentChat } = storeToRefs( chatStore );

const usersStore = useUserStore();

function lastMessageSmall( string: String) {

	if (string.length > 30) {
		return string.slice(0, 30) + '...';
	}
	return string;
	
}

const isActive = computed<boolean>(() => {
	if (!currentChat.value) {
		return false;
	}
	return currentChat.value?.id === props.chatItem.id
});

const companion = computed<UserDB | null>(() => {
	
	const companionId = props.chatItem.members.find((item) => item !== '1');

	if (companionId ) {

		return usersStore.getUserById(companionId);

	} else {

		return null

	}
	
});

const companionFullName = computed<string>(() => {

	return companion.value 
		? `${companion.value.name} ${companion.value.surName}` 
		: '';

});

const selectCurrentChat = (chat: ChatDB) => {

	chatStore.selectCurrentChat(chat);
	
};

</script>

<template>
	<div
		class="chat-item"
		:class="{ 'chat-item_active': isActive }"
		@click="selectCurrentChat(chatItem)"
	>
		<UiAvatar
			class="chat-item__avatar"
			:user="companion"
		/>

		<div class="chat-item__description">
			<h4 class="chat-item__name">
				{{ companionFullName }}
			</h4>

			<span class="chat-item__last-message">
				{{ lastMessageSmall( chatItem.lastMessage.text || '' ) }}
			</span>
		</div>
	</div>
</template>

<style
	lang="scss"
	scoped
>
@import './ChatItem';
</style>
