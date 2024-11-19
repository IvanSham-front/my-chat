import { ChatDB, IChat } from '@/types/Chat';
import { IMessage, MessageDB } from '@/types/Message';

export class Chat implements ChatDB {
	type: 'private' | 'group';
	members: Array<string>;
	iconUrl?: string;
	lastMessage: IMessage | MessageDB;
	createdAt: string;
	updatedAt: string;
	id: string;

	constructor(chatData: ChatDB) {
		this.type = chatData.type;
		this.members = chatData.members;
		this.lastMessage = chatData.lastMessage;
		this.createdAt = chatData.createdAt;
		this.updatedAt = chatData.updatedAt;
		this.id = chatData.id;
	}

	static getChatList() {
		// тоже через сокет chats:list
	}

	static async create(chat: IChat) {
		console.debug(chat);
		
		// отправка через сокет 'chats:create'
	}

	delete() {
		// отправка через сокет 'chats:delete'
	}

	private isGroup () {
		return this.type === 'group';
	}

	addMember(userId: string) {
		if (this.isGroup() && !this.members.includes(userId)) {
			this.members.push(userId);
			// отправка через сокет
		}
	}

	updateLastMessage(message: MessageDB | IMessage) {
		this.lastMessage = message;
	}


	getMessageList() {

		// получить по сокету и сохранить в сторе. 

	}
}
