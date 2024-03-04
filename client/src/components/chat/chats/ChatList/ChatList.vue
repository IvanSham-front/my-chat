<script setup>
import SearchInput from '../../SearchInput/SearchInput.vue';
import ChatItem from '../ChatItem/ChatItem.vue';
import UiScroll from '@/components/ui/scroll/UiScroll.vue';

</script>

<template>
	<div class="chat-list">
		<SearchInput
			class="chat-list__search-field"
			placeholder="search here..."
		/>
		
		<UiScroll class="chat-list__items">
			<ChatItem
				v-for="item in 4"
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
