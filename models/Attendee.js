const mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const AttendeeSchema = new Schema({
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
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please use a valid email address']
	},
	registered: {
        type: Date,
        required: true
	}
});

module.exports = mongoose.model('Attendee', AttendeeSchema, 'attendees');