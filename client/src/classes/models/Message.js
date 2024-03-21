import store from '@/store/index';

export class Message {
	constructor({ id, text, sellerId, isRead, date, attachment }) {
		this.id = id;
		this.text = text;
		this.sellerId = sellerId;
		this.isRead = isRead;
		this.date = date;
		this.attachment = attachment;
		this.store = store;
	}

	sendMessage(message) {
		this.store.dispatch('sendMessage', message);
	}
}
