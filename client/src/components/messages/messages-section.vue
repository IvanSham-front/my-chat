<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import UserBlock from '../user-block/user-block.vue';
import SearchIcon from '@/assets/images/search-icon.vue';
import OptionIcon from '@/assets/images/option-icon.vue';
import MessageList from './message-list/message-list.vue';
import MessageInput from '../ui/message-input/message-input.vue';
import { useChatsStore } from '@/store/chats/chats';
import { useUserStore } from '@/store/users/users';
// import { IMessage } from '@/types/Message';

const chatStore = useChatsStore();
const currentChat = computed(() => chatStore.currentChat);

const messagesList = chatStore.messagesCurrentChat;

const { authUser, getUserById } = useUserStore();

const companion = computed(() => {
	if (!currentChat.value) return null;

	const companionId = currentChat.value.members.find((item) => item !== authUser?.id);

	if (!companionId) return null;

	return getUserById(companionId);
});

const messageListRef = ref<HTMLDivElement | null>(null);
const messageInputRef = ref<HTMLInputElement | null>(null);

provide('messageListRef', messageListRef);
provide('messageInputRef', messageInputRef);

const adjustContentMessagesHeight = () => {
	if (!messageInputRef.value || !messageListRef.value) {
		return;
	}
	const newHeight = messageInputRef.value.scrollHeight - 45;

	if (newHeight > 3) {
		messageListRef.value.style.maxHeight = `calc(100vh - 16rem - ${newHeight}px)`;
	} else {
		messageListRef.value.style.maxHeight = 'calc(100vh - 16rem)';
	}
};

const onSendMessage = () => {
	if (!currentChat.value) {
		return;
	}
};

</script>

<template>
	<section class="messages">
		<div class="messages__inner" v-if="currentChat">
			<div class="messages__header">
				<UserBlock :user="companion" />

				<div class="message__actions">
					<button class="messages__action-button">
						<SearchIcon />
					</button>

					<button class="messages__action-button">
						<OptionIcon />
					</button>
				</div>
			</div>

			<div class="messages__content">
				<MessageList :message-list-ref="messageListRef" class="messages__list" :messages="messagesList || []" />

				<MessageInput
					:message-input-ref="messageInputRef"
					class="messages__new-text"
					@input="adjustContentMessagesHeight"
					@on-send-message="onSendMessage"
				/>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@import './messages-section.scss';
</style>
