<script setup lang="ts">
import { ref } from 'vue';

import EmojiPicker from 'vue3-emoji-picker';
import EmojiIcon from '@/assets/images/EmojiIcon.vue';

const emit = defineEmits(['input']);

const showPicker = ref(false);
const emojiPickerRef = ref(null);

const onShowPicker = () => {
	showPicker.value = true;
};

const onClosePicker = () => {
	showPicker.value = false;
};

const selectEmoji = (emoji: any) => {
	emit('input', emoji.i);
};
</script>

<template>
	<div class="emoji-picker" ref="emojiPickerRef" @mouseleave="onClosePicker">
		<div class="emoji-picker__toggler" @mouseenter="onShowPicker">
			<EmojiIcon />
		</div>

		<div class="emoji-picker__content">
			<EmojiPicker v-show="showPicker" :native="true" theme="dark" @select="selectEmoji" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './EmojiPicker.scss';
</style>
