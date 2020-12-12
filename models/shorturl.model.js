const mongoose = require('mongoose');
const shortUrlSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
		unique: true,
	},
	hash: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
