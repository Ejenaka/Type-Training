const { Schema, model } = require('mongoose');

const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	highScore: {
		type: Number,
		default: 0,
	},
});

module.exports = model('Player', schema);
