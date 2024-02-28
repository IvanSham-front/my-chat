<script setup>
import BaseInput from "@/components/ui/BaseInput/BaseInput.vue";
import SearchIcon from "@/assets/images/SearchIcon.vue";
import ChatItem from "../ChatItem/ChatItem.vue";
</script>

<template>
	<div class="chat-list">
		<BaseInput
			class="chat-list__search-field"
			placeholder="search here..."
		>
			<SearchIcon />
		</BaseInput>

		<ul class="chat-list__items">
			<ChatItem
				v-for="item in 4"
				:key="item.name"
			/>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
@import './ChatList';

</style>