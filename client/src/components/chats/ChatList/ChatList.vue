<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import SearchInput from '@/components/ui/SearchInput/SearchInput.vue';
import ChatItem from '../ChatItem/ChatItem.vue';
import UiScroll from '@/components/ui/scroll/UiScroll.vue';

const store = useStore();

const chatList = computed(() => store.getters.chatList); 

</script>

<template>
	<div class="chat-list">
		<SearchInput
			class="chat-list__search-field"
			placeholder="search here..."
		/>
		
		<UiScroll class="chat-list__items">
			<ChatItem
				v-for="item in chatList"
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
