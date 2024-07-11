const { mongoose } = require('mongoose');
const ApiError = require('../exceptions/api-error');

const Chat = mongoose.model('Chat', require('../models/Chat'));
const Message = mongoose.model('Message', require('../models/Message'));

class MessageServices {

	async send ( { message, sellerId } ) {

		if (!Object.keys(message).length) {

			throw ApiError.BadRequest( 'Message are not found.' );

		}

		if (!Object.hasOwnProperty.call( message, 'type')) {

			throw ApiError.BadRequest( 'Message type not specified' )

		}

		const chat = await Chat.findById( message.chatId );

		if ( !chat ) {

			throw ApiError.BadRequest( `Chat [ ${ message.chatId } ] not found.` );

		}

		if (!sellerId) {

			throw ApiError.BadRequest( 'SellerId not specified' );

		}

		const resultMessage = await Message.create({ ...message, sellerId });

		return resultMessage;

	}

	async remove ( messageId ) {

		const message = await Message.findByIdAndDelete(messageId);

		return message

	}

	async getMessagesByChatId ({ chatId, userId }) {

		const chat = await Chat.findById(chatId);

		if ( !chat.members.includes( userId ) ) {

			throw ApiError.BadRequest( `User [ ${ userId } ] are not member chat [ ${ chatId } ]` );

		}

		const messages = await Message.find({ chatId });

		return messages

	}

}

module.exports = new MessageServices();