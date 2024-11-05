<script setup lang="ts">
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

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
	modelValue: {
		type: String,
		default: () => ''
	},
});

const emit = defineEmits(['update:modelValue']);

const handleInputChange = (e: Event) => {
	const target = e.target as HTMLInputElement;

	emit('update:modelValue', target.value);
};

const isActive = computed(() => !!props.modelValue);
</script>

<template>
	<div class="ui-text">
		<input
			v-if="type !== 'number'"
			:class="['ui-text__input', { active: isActive }]"
			:type="type"
			:required="required || false"
			:id="id"
			:name="id"
			:value="modelValue"
			@input="handleInputChange"
		/>

		<label class="ui-text__label" :for="id">{{ labelText }}</label>
	</div>
</template>

<style scoped lang="scss">
	@import './TextInput.scss';
</style>
