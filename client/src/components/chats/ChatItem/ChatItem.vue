<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import UiAvatar from '@/components/ui/avatar/UiAvatar.vue';

const store = useStore();

const props = defineProps({
	chatItem: {
		type: Object,
		required: true
	},
});

function lastMessageSmall( string: String) {
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

const companionFullName = computed(() => companion.value ? `${companion.value.name} ${companion.value.surName}` : '');

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
		<UiAvatar
			class="chat-item__avatar"
			:user="companion"
		/>

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
