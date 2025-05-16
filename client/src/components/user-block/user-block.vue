<script setup lang="ts">
import UiAvatar from '@/components/ui/avatar/ui-avatar.vue';
import { useUserStore } from '@/store/users/users';
import { UserDB } from '@/types/User';
import { computed } from 'vue';

const props = defineProps<{
	user: UserDB;
}>();

const { fullNameById } = useUserStore();
const userFullName = computed(() => { console.log(props.user);
	return fullNameById(props.user.id);});

</script>

<template>
	<div class="user-block">
		<UiAvatar class="user-block__avatar" :user="user" />

		<div class="user-block__info">
			<h4 class="user-block__name">
				{{ userFullName }}
			</h4>

			<span class="user-block__login">
				{{ user?.login }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './user-block.scss';
</style>
