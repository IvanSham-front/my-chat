<script setup lang="ts">
import TextInput from '@/components/ui/text-input/text-input.vue';
import AvatarUploader from '@/components/ui/avatar-uploader/avatar-uploader.vue';
import { useAuth } from '@/hooks/useAuth';

const { authUser } = useAuth();
</script>

<template>
	<div class="user-settings">
		<AvatarUploader />

		<TextInput :label-text="'First name'" :value="authUser?.name || ''" :id="'firstName'" :required="true" />

		<TextInput :label-text="'Last name'" :value="authUser?.surName || ''" :id="'lastName'" :required="true" />

		<TextInput :label-text="'Status'" :value="authUser?.status || ''" :id="'lastName'" :required="true" />

		<TextInput :label-text="'Username'" :value="authUser?.login || ''" :id="'username'" :required="true" />
	</div>
</template>

<style scoped lang="scss">
@import './user-settings.scss';
</style>
