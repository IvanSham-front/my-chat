<script setup lang="ts">
import { Socket } from 'socket.io-client';
import { ref, inject } from 'vue';

const login = ref<string>('');
const password = ref<string>('');

const socket = inject('socket') as Socket;

const onLogin = async (e: Event) => {
	e.preventDefault();

	const user = { 
		login: login.value, 
		password: password.value 
	};

	fetch('http://localhost:3020/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(user),
		credentials: 'include',
	})
		.then((response) => response.json())
		.then(() => {
			socket.connect();
		});
};
</script>

<template>
	<div>Login</div>

	<form @submit="onLogin">
		<input v-model="login" placeholder="login" />
		<input v-model="password" placeholder="password" />
		<button>login</button>
	</form>
</template>
