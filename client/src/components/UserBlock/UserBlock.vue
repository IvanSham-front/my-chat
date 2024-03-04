<script setup>
defineProps({
	user: {
		type: Object,
	},
});

function getFullUserName(user) {
	return `${user.name} ${user.surName}`;
}
</script>

<template>
	<div class="user-block">
		<div class="user-block__avatar">
			<img
				class="user-block__avatar-img"
				:src="user.avatarUrl"
				:alt="user.name"
			/>
			<div
				v-if="user.isOnline"
				class="user-block__online-status"
			></div>
		</div>
		
		<div class="user-block__info">
			<h4 class="user-block__name">
				{{ getFullUserName(user) }}
			</h4>

			<span class="user-block__login">
				{{ user.login }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import './UserBlock.scss';
</style>