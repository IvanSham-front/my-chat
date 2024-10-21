<script setup lang="ts">

import { ref, inject } from 'vue';
import EmojiPicker from '../EmojiPickerInput/EmojiPicker.vue';
import { useCursor } from '@/hooks/useCursor';
import UiScroll from '../scroll/UiScroll.vue';
import SendMessageIcon from '@/assets/images/SendMessageIcon.vue';
import moment from 'moment';

const messageInputRef = inject('messageInputRef', null);
const textFieldRef = ref<HTMLInputElement | null>(null);
const messageText = ref('');

const emit = defineEmits(['on-send-message', 'input']);

const { getCursorPosition, adjustCursorToEnd, setCursorPosition } = useCursor();

const addEmojiOnMessage = (value: string) => {

	if ( textFieldRef.value ) {
		
		const position = getCursorPosition(textFieldRef.value);

		if (position === textFieldRef.value.value.length) {

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
		
	} else {

		console.error( 'text input ref is undefined' );

	}

};

const setMessageText = (e: Event) => {

	const target = e.target as HTMLElement;

	if ( target ) {

		messageText.value = target.innerText;

	}

};

const onSendMessage = () => {

	if (textFieldRef.value) {
        textFieldRef.value.innerHTML = '';
      }

	if ( textFieldRef.value ) {

		textFieldRef.value.innerHTML = '';

	}

	const message = {
		id: Math.random(),
		text: messageText.value.trim(),
		sellerId: 1,
		isRead: true,
		date: moment().format('HH:mm')
	};

	emit('input');
	emit('on-send-message', message);
	messageText.value = '';
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
				@keyup.exact.enter="onSendMessage"
			></div>
		</UiScroll>

		<button
			class="message-input__button-send"
			@click="onSendMessage"
		>
			<SendMessageIcon />
		</button>
	</div>
</template>

<style
	scoped
	lang="scss"
>
@import './MessageInput.scss';
</style>