import { IMessage, MessageDB } from '@/types/Message';

export class Message implements MessageDB {
	type!: 'text' | 'audio' | 'attachment';
	sellerId!: string;
	isRead?: boolean;
	chatId!: string;
	text?: string;
	createdAt!: string;
	updatedAt!: string;
	id!: string;

	constructor(messageData: MessageDB) {
		Object.assign(this, messageData);
	}

	static send(message: IMessage) {
		console.debug(message);
		// отправка через сокет, 'message:send' 
		// или через http, если это файл POST /chats/{{chatId}}/messages
		// Сохранить в чате, как последнее сообщение
	}

	delete () {



	}

}

export class MessageAttachment extends Message {
	fileId: string;

	constructor (messageData: MessageDB) {
		super(messageData);
		
		if (!messageData.fileId) {
			throw new Error('Attachment message must have a fileId property');
		}

		this.fileId = messageData.fileId;
	}

	download () {
		// files/fileId/download
	}
	
	getStream () {
		// для аудио контента.
		// files/stream/:fileId
	}
}