const mongoose = require('mongoose');
const shortUrlSchema = new mongoose.Schema({
	original_url: {
		type: String,
		required: true,
		unique: true,
	},
	short_url: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
