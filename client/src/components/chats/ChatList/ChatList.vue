<script setup>
import { useStore } from 'vuex';
import { computed, ref, inject } from 'vue';
import SearchInput from '@/components/ui/SearchInput/SearchInput.vue';
import ChatItem from '../ChatItem/ChatItem.vue';
import UiScroll from '@/components/ui/scroll/UiScroll.vue';
import PlusIcon from '@/assets/images/PlusIcon.vue';

const modal = inject('modal');

const store = useStore();

const searchValue = ref('');

const chatList = computed(() => store.getters.chatList);

const filterChatList = computed(() => {

	if (!searchValue.value) {
		return chatList.value;
	}


	const result = chatList.value.filter(chat => {

		const companions = chat.members.map(
			member => {
				if (member !== 1) {
					return store.getters.getUserById(member);
				}
			}
		).filter(item => item);

		for (let companion of companions) {

			if (
				companion.name.toUpperCase().includes(searchValue.value.toUpperCase())
				|| companion.surName.toUpperCase().includes(searchValue.value.toUpperCase()
					|| `${companion.name} ${companion.surName}`.toUpperCase().includes(searchValue.value.toUpperCase()))) {
				return true;
			}
		}

		return false;

	});

	return result;

});

const openModal = () => {

	modal.open({
		modalName: 'TestModal',
		modalProps: ''
	});

};

</script>

<template>
	<div class="chat-list">
		<div class="chat-list__header">
			<SearchInput
				class="chat-list__search-field"
				placeholder="search here..."
				v-model="searchValue"
			/>
			<button class="chat-list__add-button" @click="openModal">
				<PlusIcon />
			</button>
		</div>


		<UiScroll class="chat-list__items">
			<ChatItem
				v-for="item in filterChatList"
				:chat-item="item"
				:key="item.name"
			/>
		</UiScroll>
	</div>
</template>

<style
	lang="scss"
	scoped
>
@import './ChatList';
</style>
