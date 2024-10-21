<script setup type='ts'>
import { ref, provide, computed } from 'vue';
import UserBlock from '../UserBlock/UserBlock.vue';
import SearchIcon from '@/assets/images/SearchIcon.vue';
import OptionIcon from '@/assets/images/OptionIcon.vue';
import MessageList from './MessageList/MessageList.vue';
import MessageInput from '../ui/MessageInput/MessageInput.vue';
import { useChatsStore } from '@/store/chats/chats';


const chatStore = useChatsStore();

const messagesList = chatStore.getMessagesCurrentChat;

const companion = computed(() => {
	const companionId = currentChat.value.members.find((item) => item !== 1);
	return store.getters.getUserById(companionId);
});

const messageListRef = ref(null);
const messageInputRef = ref(null);

provide('messageListRef', messageListRef);
provide('messageInputRef', messageInputRef);

const adjustContentMessagesHeight = () => {
	const newHeight = messageInputRef.value.scrollHeight - 45;

	if (newHeight > 3) {
		messageListRef.value.style.maxHeight = `calc(100vh - 16rem - ${newHeight}px)`;
	} else {
		messageListRef.value.style.maxHeight = 'calc(100vh - 16rem)';
	}
};

const onSendMessage = (messageObject) => {
	messagesList.push(messageObject);
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
				<MessageList
					:messageListRef="messageListRef"
					class="messages__list"
					:messages="messagesList"
				/>

				<MessageInput
					:messageInputRef="messageInputRef"
					class="messages__new-text"
					@input="adjustContentMessagesHeight"
					@on-send-message="onSendMessage"
				/>
			</div>
		</div>
	</section>

</template>

<style
	lang="scss"
	scoped
>
@import './MessagesSection';
</style>