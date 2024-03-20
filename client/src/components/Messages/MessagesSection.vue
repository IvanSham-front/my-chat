<script setup>
import { ref, provide } from 'vue';
import UserBlock from '../UserBlock/UserBlock.vue';
import SearchIcon from '@/assets/images/SearchIcon.vue';
import OptionIcon from '@/assets/images/OptionIcon.vue';
import MessageList from './MessageList/MessageList.vue';
import MessageInput from '../ui/MessageInput/MessageInput.vue';
import messages from './messages';

const userObject = {

	id: 2,
	login: '@anna_sham',
	name: 'Anna',
	surName: 'Shamenkova',
	status: 'My life my rules',
	avatarUrl: 'https://img.freepik.com/premium-photo/3d-cat-avatar-online-games-web-account-avatar_147351-46.jpg',
	isOnline: false,

};

const messagesList = ref(messages);

const messageListRef = ref(null);
const messageInputRef = ref(null);

provide('messageListRef', messageListRef);
provide('messageInputRef', messageInputRef);

const adjustContentMessagesHeight = () => {
	const newHeight = messageInputRef.value.scrollHeight - 45;

	if (newHeight > 3) {
		messageListRef.value.style.maxHeight = `calc(100vh - 16rem - ${ newHeight }px)`;
	} else {
		messageListRef.value.style.maxHeight = 'calc(100vh - 16rem)';
	}
};

const onSendMessage = (messageObject) => {
	messagesList.value.push(messageObject);
};

</script>

<template>
	<section class="messages">
		<div class="messages__header">
			<UserBlock :user="userObject" />

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
	</section>

</template>

<style lang="scss" scoped >
@import './MessagesSection';
</style>