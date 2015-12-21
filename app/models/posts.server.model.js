var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var safe = {w: 1};

var PostsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true,
		enum: ['inside', 'outside', 'relatives', 'anthro']
	},
	created: {
		type: Date,
		default: Date.now
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'Users'
	},
	coverPhotoURL: String,
	short: String
}, {safe: safe});

mongoose.model('Posts', PostsSchema);