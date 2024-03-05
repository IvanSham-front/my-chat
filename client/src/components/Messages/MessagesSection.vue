<script setup>
import { ref, provide } from 'vue';
import UserBlock from '../UserBlock/UserBlock.vue';
import SearchIcon from '@/assets/images/SearchIcon.vue';
import WarningIcon from '@/assets/images/WarningIcon.vue';
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

const messageListRef = ref(null);
const messageInputRef = ref(null);

const adjustContentMessagesHeight = () => {
	const newHeight = messageInputRef.value.scrollHeight - 45;

	if (newHeight > 3) {
		messageListRef.value.style.maxHeight = `calc(100vh - 16rem - ${ newHeight }px)`;
	} else {
		messageListRef.value.style.maxHeight = 'calc(100vh - 16rem)';
	}
};

provide('messageListRef', messageListRef);
provide('messageInputRef', messageInputRef);

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
					<WarningIcon />
				</button>
			</div>
		</div>

		<div class="messages__content">
			<MessageList
				:messageListRef="messageListRef"
				class="messages__list"
				:messages="messages"
			/>

			<MessageInput
				:messageInputRef="messageInputRef"
				class="messages__new-text"
				@input="adjustContentMessagesHeight"
			/>
		</div>
	</section>

</template>

<style lang="scss" scoped >
@import './MessagesSection';
</style>