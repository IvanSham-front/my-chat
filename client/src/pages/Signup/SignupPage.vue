<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/hooks/useAuth';
import TextInput from '@/components/ui/text-input/TextInput.vue';
import UiButton from '@/components/ui/button/UiButton.vue';
import CredentialsValidator from '@/tools/CredentialsValidator';

const { checkExsistLogin, signup } = useAuth();

const login = ref<string>('');
const password = ref<string>('');

const validErrors = ref({
	login: '',
	password: ''
});

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
	
	try {

		const resultExsist = await checkExsistLogin(login.value);

		if (resultExsist && typeof resultExsist === 'boolean') {
			validErrors.value.login = 'User with that login already exists';
			return;

		} else {

			await signup({
				login: login.value,
				password: password.value
			});

		}

	} catch (error) {

		throw error;

	}
	
};

</script>

<template>
	<section class="signup-page">
		<header class="signup-page__header">
			<h1 class="signup-page__title">Welcome to chat!</h1>
			<span class="signup-page__description">Already have an account?
				<router-link to="/signin">Sign In</router-link>
			</span>
		</header>

		<form class="signup-page__form" @submit.prevent="onSubmitForm">

			<div class="signup-page__input-container">
				<text-input 
					label-text="login" 
					id="login-input" 
					v-model="login"
					:invalid="!!validErrors.login"
				/>
				<span class="signup-page__error-span">
					{{ validErrors.login }}
				</span>

				<text-input
					label-text="password"
					id="login-input" 
					v-model="password" 
					type="password"
					:invalid="!!validErrors.password"
				/>

				<span class="signup-page__error-span">
					{{ validErrors.password }}
				</span>
			</div>

			<ui-button
				type="submit"
			>
				Sign Up
			</ui-button>
		</form>
	</section>
</template>

<style lang="scss" scoped>
@import './SignupPage.scss';
</style>