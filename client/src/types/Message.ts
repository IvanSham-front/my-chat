export interface Message {

	type: "text" | "audio" | "attachment",
	sellerId: string,
	isRead?: boolean,
	chatId: string
	text?: string,
	fileId?: string

}

export interface MessagesState {

	list: Message[],
	
}