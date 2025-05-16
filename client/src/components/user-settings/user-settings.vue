<script setup lang="ts">
import TextInput from '@/components/ui/text-input/text-input.vue';
import AvatarUploader from '@/components/ui/avatar-uploader/avatar-uploader.vue';
import { useAuth } from '@/hooks/useAuth';
import { reactive } from 'vue';
import { IUser } from '@/types/User';
import UiButton from '../ui/button/ui-button.vue';
import { useUserStore } from '@/store/users/users';

const { authUser } = useAuth();

const form = reactive<IUser>({
	login: authUser.value?.login || '',
	name: authUser.value?.name || '',
	surName: authUser.value?.surName || '',
	status: authUser.value?.status || '',
	avatarUrl: authUser.value?.avatarUrl || '',
});

const { updateAuthUser } = useUserStore();

function saveUserSettings() {

	if (!authUser.value) {
		console.error('Not auth user');
		return;
		
	}

	const payload = {

		...authUser.value,
		...form

	};
	
	updateAuthUser(payload);

}

</script>

<template>
	<div class="user-settings">
		<AvatarUploader />

		<TextInput 
			:label-text="'First name'" 
			v-model="form.name" 
			:id="'firstName'" 
			:required="true" 
		/>

		<TextInput 
			:label-text="'Last name'" 
			v-model="form.surName" 
			:id="'lastName'" 
			:required="true" 
		/>

		<TextInput 
			:label-text="'Status'"
			v-model="form.status" 
			:id="'lastName'"
			:required="true" 
		/>

		<TextInput 
			:label-text="'Username'" 
			v-model="form.login" 
			:id="'username'" 
			:required="true" 
		/>

		<UiButton 
			@click="saveUserSettings" 
			type="button"
		>
			Save
		</UiButton>
	</div>
</template>

<style scoped lang="scss">
@import './user-settings.scss';
</style>
