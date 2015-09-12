var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostsSchema = new Schema({
	title: String,
	body: String,
	category: String,
	coverPhotoURL: String,
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Posts', PostsSchema);