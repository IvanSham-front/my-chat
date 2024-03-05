<script setup>
import { ref, inject } from 'vue';
import EmojiPicker from '../EmojiPickerInput/EmojiPicker.vue';
import { getCursorPosition, adjustCursorToEnd, setCursorPosition } from '@/mixins/withCursorFunctions';
import UiScroll from '../scroll/UiScroll.vue';

const messageInputRef = inject('messageInputRef', null);
const textFieldRef = ref(null);
const messageText = ref('');

const addEmojiOnMessage = (value) => {
	const position = getCursorPosition(textFieldRef.value);
	
	if (position === textFieldRef.value.length) {

		messageText.value = messageText.value + ' ' + value;
		textFieldRef.value.innerHTML = messageText.value;
		adjustCursorToEnd(textFieldRef.value);

	} else {
		messageText.value = 
			messageText.value.substring(0, position) 
			+ ` ${value} ` 
			+ messageText.value.substring(position, messageText.value.length);

		textFieldRef.value.innerHTML = messageText.value;
		setCursorPosition(textFieldRef.value, position + 3);

	}
};

const setMessageText = (e) => {
	messageText.value = e.target.innerText;
};

</script>

<template>
	<div
		class="message-input"
		ref="messageInputRef"
	>

		<EmojiPicker @input="addEmojiOnMessage" />
		<UiScroll class="message-input__scroll">
			<div
				ref="textFieldRef"
				class="message-input__text-editor"
				contenteditable="true"
				@input="setMessageText"
			></div>
		</UiScroll>
	</div>
</template>

<style
	scoped
	lang="scss"
>
@import './MessageInput.scss';
</style>