const { Schema } = require('mongoose');

const schema = new Schema(
	{
		login: {
			type: String,
			required: true,
		},
		name: {
			type: String,
		},
		surName: {
			type: String,
		},
		status: {
			type: String,
		},
		avatarUrl: {
			type: String,
		},

		color: {
			type: String,
		},
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
