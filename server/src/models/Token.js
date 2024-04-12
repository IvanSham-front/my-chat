const { Schema } = require('mongoose');

const schema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	refreshToken: {
		type: String,
		required: true,
	},
});

module.exports = schema;