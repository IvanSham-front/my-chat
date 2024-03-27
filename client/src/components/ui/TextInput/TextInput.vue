<script setup>
import { computed } from 'vue';

const props = defineProps({
	labelText: {
		type: String
	},
	type: {
		type: String,
		default: () => 'text'
	},
	required: {
		type: Boolean
	},
	id: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	}
});

const emit = defineEmits(['input']);

const handleInputChange = (e) => {
	emit('input', e.target.value);
};

const isActive = computed(() => !!props.value);


</script>

<template>
	<div class="ui-text">

		<input
			v-if="type !== 'number'"
			:class="['ui-text__input', { 'active': isActive }]"
			:type="type"
			:required="required || false"
			:id="id"
			:name="id"
			:value="value"
			@change="handleInputChange"
		>

		<label
			class="ui-text__label"
			:for="name"
		>{{ labelText }}</label>
	</div>
</template>

<style
	scoped
	lang="scss"
>
@import './TextInput.scss';
</style>