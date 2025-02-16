<script setup lang="ts">
import UiAvatar from '@/components/ui/avatar/UiAvatar.vue';
import { UserDB } from '@/types/User';

defineProps<{
	user: UserDB | null;
}>();

function getFullUserName(user: UserDB | null): string {
	if (user) {
		return `${user.name} ${user.surName}`;
	} else return '';
}
</script>

<template>
	<div class="user-block">
		<UiAvatar class="user-block__avatar" :user="user" />

		<div class="user-block__info">
			<h4 class="user-block__name">
				{{ getFullUserName(user) }}
			</h4>

			<span class="user-block__login">
				{{ user?.login }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './UserBlock.scss';
</style>
