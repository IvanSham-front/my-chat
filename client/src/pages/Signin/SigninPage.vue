<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/hooks/useAuth';
import TextInput from '@/components/ui/text-input/TextInput.vue';
import UiButton from '@/components/ui/button/UiButton.vue';
import CredentialsValidator from '@/tools/CredentialsValidator';

const { signin } = useAuth();

const login = ref<string>('');
const password = ref<string>('');

const validErrors = ref({
	login: '',
	password: ''
});

const unknowCredentials = ref<boolean>(false);

const IsValidForm = () => {
	const validator = new CredentialsValidator(login.value, password.value);
	const validData = validator.validate();

	let validFlag = true;

	validErrors.value.login = validData.login.error;
	validErrors.value.password = validData.password.error;

	if (!validData.login.valid || !validData.password.valid) {
		validFlag = false;
	}
	
	return validFlag;
};

const onSubmitForm = async () => {
	if (!IsValidForm()) {
		return;
	}

	const res = await signin({
		login: login.value,
		password: password.value
	});

	if (!res) {
		unknowCredentials.value = true;
	} else {
		unknowCredentials.value = false;
	}

};

</script>

<template>
	<section class="signin-page">
		<header class="signin-page__header">
			<h1 class="signin-page__title">Welcome to chat!</h1>
			<span class="signin-page__description">
				Don't have an account? 
				<router-link  to="/signup">Sign Up</router-link>
			</span>
		</header>

		<form class="signin-page__form" @submit.prevent="onSubmitForm">

			<div class="signin-page__input-container">
				<text-input 
					label-text="login" 
					id="login-input" 
					v-model="login"
					:invalid="!!validErrors.login"
				/>
				<span class="signin-page__error-span">
					{{ validErrors.login }}
				</span>

				<text-input
					label-text="password"
					id="password-input" 
					v-model="password" 
					type="password"
					:invalid="!!validErrors.password"
				/>

				<span class="signin-page__error-span">
					{{ validErrors.password }}
				</span>
			</div>

			<span class="signin-page__error-span" v-if="unknowCredentials">
				Incorrect login or password
			</span>
			<ui-button
				type="submit"
			>
				Sign In
			</ui-button>
		</form>
	</section>
</template>

<style lang="scss" scoped>
@import './SigninPage.scss';
</style>