const { Schema } = require("mongoose");

const schema = new Schema(
	{
		type: {
			type: String,
			required: true,
			enum: ["text", "audio", "attachment"],
		},

		sellerId: {
			type: Schema.Types.ObjectId,
			required: true,
		},

		isRead: {
			type: Boolean,
			default: false,
		},

		chatId: {

			type: Schema.Types.ObjectId,
			ref: 'Chat',
			required: true

		},

		text: {

			type: String,
			required: function() {
				return this.type === 'text';
			}

		},

		fileId: {

			type: Schema.Types.ObjectId,
			ref: 'File',
			required: function() {
				return this.type === 'attachment'
			}

		}

	},
	{
		/**
		 ** Assigns createdAt and updatedAt fields to the schema.
		 ** @see https://mongoosejs.com/docs/guide.html#timestamps
		 **/
		timestamps: true,

		/**
		 ** Ensure the document you're updating didn't change before current transaction.
		 ** @see https://mongoosejs.com/docs/guide.html#optimisticConcurrency
		 **/
		optimisticConcurrency: true,

		/**
		 **
		 **/
		toJSON: {
			virtuals: true,
		},

		/**
		 **
		 **/
		toObject: {
			virtuals: true,
		},
	}
);

module.exports = schema;