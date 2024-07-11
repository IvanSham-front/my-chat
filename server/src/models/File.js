const { Schema } = require('mongoose');

const schema = new Schema(
	{
		type: {
			type: String,
			required: true,
			enum: ['image', 'video', 'audio', 'other'],
		},

		ownerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},

		name: {
			type: String,
			required: true
		},

		mimeType: {
			type: String
		},

		size: {
			type: Number,
			required: true
		},

		path: {

			type: String,
			required: true

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