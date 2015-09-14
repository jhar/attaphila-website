var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	coverPhotoURL: String,
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Posts', PostsSchema);