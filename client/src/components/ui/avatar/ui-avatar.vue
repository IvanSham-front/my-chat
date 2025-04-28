<script setup lang="ts">
import { UserDB } from '@/types/User';
import { computed } from 'vue';

const props = defineProps<{
	user?: UserDB | null;
}>();

const fullName = computed<string>(() => `${props.user?.name || ''} ${props.user?.surName || ''}`);

const initials = computed<string>(() => {
	if (!props.user) {
		return '';
	}

	let result = '';

	if (props.user.name) {
		result += props.user.name[0];
	}

	if (props.user.surName) {
		result += props.user.surName[0];
	}

	if (!result) {
		result += props.user.login[0];
	}

	return result;
});
</script>

<template>
	<div class="ui-avatar">
		<div class="ui-avatar__img" v-if="!user"></div>

		<img class="ui-avatar__img" v-else-if="user.avatarUrl" :src="`http://localhost:3020/api${ user.avatarUrl }`" :alt="fullName" />

		<div v-else class="ui-avatar__no-img" :style="{ backgroundColor: user.color }">{{ initials }}</div>

		<!-- <div class="ui-avatar__online-status" v-if="user.isOnline"></div> -->
	</div>
</template>

<style lang="scss" scoped>
	@import './ui-avatar.scss';
</style>
