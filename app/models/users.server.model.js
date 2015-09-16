var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UsersSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	joined: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Users', UsersSchema);