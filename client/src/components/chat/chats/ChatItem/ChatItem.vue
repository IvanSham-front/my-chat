<script setup>

defineProps({
	isActive: {
		type: Boolean,
		default: true
	} 
});

function lastMessageSmall(string) {

	if (string.length > 30) {
		return string.slice(0, 30) + "...";
	}
	return string;

}

const chatItem = {
	avatar: "https://img.freepik.com/premium-photo/3d-cat-avatar-online-games-web-account-avatar_147351-46.jpg",
	name: "Ivan Ivanov",
	lastMessage: {
		text: "Hello, my friend! How do you do? I am fine bla bla bla bla bla ",
	},
	isOnline: false,
};

</script>

<template>
	<div
		class="chat-item"
		:class="{ 'chat-item_active': isActive }"
	>
		<div class="chat-item__avatar">
			<img
				class="chat-item__avatar-img"
				:src="chatItem.avatar"
				:alt="chatItem.name"
			/>
			<div class="chat-item__online-status"></div>
		</div>

		<div class="chat-item__description">
			<h4 class="chat-item__name">
				{{ chatItem.name }}
			</h4>

			<span class="chat-item__last-message">
				{{ lastMessageSmall(chatItem.lastMessage.text) }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "./ChatItem";
</style>
