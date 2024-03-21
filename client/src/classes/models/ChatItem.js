import store from '@/store/index';
import { Message } from './Message';

export class ChatItem {
	constructor({ id, type, lastMessage, members }) {
		this.id = id;
		this.type = type;
		this.lastMessage = new Message(lastMessage);
		this.members = members;
	}

	selectCurrentChat() {
		store.dispatch('selectCurrentChat', this);
	}
}

export class PersonalChatItem extends ChatItem {
	constructor() {
		super();
	}

}

export class GroupChatItem extends ChatItem {
	constructor({ chatName, chatAvatar }) {
		super();
		this.chatName = chatName;
		this.chatAvatar = chatAvatar;
	}
}
