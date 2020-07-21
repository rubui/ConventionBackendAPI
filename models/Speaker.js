const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SpeakerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	company: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	bio: {
        type: String,
        required: true
	}
});

module.exports = mongoose.model('Speaker', SpeakerSchema);