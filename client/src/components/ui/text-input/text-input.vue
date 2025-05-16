<script setup lang="ts">
import { computed, ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import EyeIcon from '@/assets/images/eye-icon.vue';


const props = defineProps({
	labelText: {
		type: String,
		default: () => ''
	},
	type: {
		type: String,
		default: () => 'text',
	},
	required: {
		type: Boolean,
	},
	id: {
		type: String,
		required: true,
	},
	
	modelValue: [ String, Number ],

	invalid: {
		type: Boolean,
		default: () => false
	}
});

const emit = defineEmits(['update:modelValue']);

const handleInputChange = (e: Event) => {
	const target = e.target as HTMLInputElement;

	emit('update:modelValue', target.value);
};

const isActive = computed(() => !!props.modelValue);

const showPassword = ref<boolean>(false);

const inputType = computed(() => {
	if (props.type === 'password' && showPassword.value) {
		return 'text';
	}
	return props.type;
});

const toggleShowPassword = () => {
	showPassword.value = !showPassword.value;
};

</script>

<template>
	<div class="ui-text">

		<input
			:class="[
				'ui-text__input', 
				{ 'active': isActive },
				{ 'invalid': invalid }
			]"
			:type="inputType"
			:required="required || false"
			:id="id"
			:name="id"
			:value="modelValue"
			@input="handleInputChange"
		/>

		<button 
			v-if="type === 'password'"
			:class="[ 'ui-text__password-button', { 'ui-text__password-button_crossout' : showPassword } ]"
			@click="toggleShowPassword" 
			type="button"
		>
			<eye-icon />
		</button>

		<label class="ui-text__label" :for="id">{{ labelText }}</label>
	</div>
</template>

<style scoped lang="scss">
@import './text-input.scss';
</style>
