<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	user: {
		type: Object,
		required: true
	}
});


const fullName = computed<string>(() => `${props.user.name} ${props.user.surName}`);

const initials = computed<string>(() => props.user.name[0] + props.user.surName[0]);

</script>

<template>
	<div class="ui-avatar">
		<img
			class="ui-avatar__img"
			v-if="user.avatarUrl"
			:src="user.avatarUrl"
			:alt="fullName"
		/>

		<div
			v-else
			class="ui-avatar__no-img"
			:style="{ backgroundColor: user.color }"
		>{{ initials }}</div>

		<div class="ui-avatar__online-status" v-if="user.isOnline"></div>
	</div>
</template>

<style
	lang="scss"
	scoped
>
@import './UiAvatar.scss';
</style>