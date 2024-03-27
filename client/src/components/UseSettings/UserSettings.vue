<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TextInput from '@/components/ui/TextInput/TextInput.vue';
import AvatarUpdater from '@/components/ui/AvatarUpdater/AvatarUpdater.vue';

const store = useStore();

const authUser = computed(() => store.getters.authUser);

</script>

<template>
	<div class="user-settings">

		<AvatarUpdater />

		<TextInput
			:label-text="'First name'"
			:value="authUser.name"
			:id="'firstName'"
			:required="true"
		/>

		<TextInput
			:label-text="'Last name'"
			:value="authUser.surName"
			:id="'lastName'"
			:required="true"
		/>

		<TextInput
			:label-text="'Status'"
			:value="authUser.status"
			:id="'lastName'"
			:required="true"
		/>

		<TextInput
			:label-text="'Username'"
			:value="authUser.login"
			:id="'username'"
			:required="true"
		/>
	</div>
</template>

<style scoped lang="scss">
@import './UserSettings.scss';
</style>