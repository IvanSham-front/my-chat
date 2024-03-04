<script setup>
import UserBlock from '../UserBlock/UserBlock.vue';	
import SearchIcon from '@/assets/images/SearchIcon.vue';
import WarningIcon from '@/assets/images/WarningIcon.vue';
import MessageList from './MessageList/MessageList.vue';
import messages from './messages';
// import messages from './messages';

const userObject = {

	id: 2,
	login: '@anna_sham',
	name: 'Anna',
	surName: 'Shamenkova',
	status: 'My life my rules',
	avatarUrl: 'https://img.freepik.com/premium-photo/3d-cat-avatar-online-games-web-account-avatar_147351-46.jpg',
	isOnline: false,

};


</script>

<template>
	<section class="messages">
		<div class="messages__header">
			<UserBlock :user="userObject"/>

			<div class="message__actions">
				<button class="messages__action-button">
					<SearchIcon />
				</button>
				<button class="messages__action-button">
					<WarningIcon />
				</button>
			</div>
		</div>

		<MessageList class="messages__list" :messages="messages"/>

	</section>

</template>

<style lang="scss" scoped>
@import './MessagesSection';
</style>