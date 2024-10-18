export interface Chat {
	type: string,
	members: Array<string>,
	iconUrl?: string,
}

export interface ChatState {

	currentChat: null | Chat,
	list: Chat[],

}