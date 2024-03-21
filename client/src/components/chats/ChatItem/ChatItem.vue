<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
	chatItem: {
		type: Object,
		required: true
	},
});

function lastMessageSmall(string) {
	if (string.length > 30) {
		return string.slice(0, 30) + '...';
	}
	return string;
}

const currentChat = computed(() => store.getters.currentChat);

const isActive = computed(() => {
	if (!currentChat.value) {
		return false;
	}
	return currentChat.value.id === props.chatItem.id;
});

const companion = computed(() => {
	const companionId = props.chatItem.members.find((item) => item !== 1);
	return store.getters.getUserById(companionId);
});

const companionFullName = companion.value ? `${companion.value.name} ${companion.value.surName}` : '';

const selectCurrentChat = (chat) => {
	store.dispatch('selectCurrentChat', chat);
};

</script>

<template>
	<div
		class="chat-item"
		:class="{ 'chat-item_active': isActive }"
		@click="selectCurrentChat(chatItem)"
	>
		<div class="chat-item__avatar">
			<img
				class="chat-item__avatar-img"
				v-if="companion.avatarUrl"
				:src="companion.avatarUrl"
				:alt="companionFullName"
			/>
			<div v-else class="chat-item__avatar-circle"></div>
			<div class="chat-item__online-status"></div>
		</div>

		<div class="chat-item__description">
			<h4 class="chat-item__name">
				{{ companionFullName }}
			</h4>

			<span class="chat-item__last-message">
				{{ lastMessageSmall(chatItem.lastMessage.text) }}
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
