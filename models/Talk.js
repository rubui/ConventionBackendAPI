const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const TalkSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	abstract: {
		type: String,
		required: true
	},
	room: {
		//Assumption : Rooms don't have to consist entirely of just numbers, example: Room 121A
		type: String,
		required: true
	},

	speaker: {
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
	},

	attendees: [{
		type: Schema.Types.ObjectId, 
		ref: 'Attendee'
	}]
});

module.exports = mongoose.model('Talk', TalkSchema, 'talks');