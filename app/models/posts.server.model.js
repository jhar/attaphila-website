var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostsSchema = new Schema({
	title: String,
	body: String,
	category: String,
	coverPhotoURL: String,
	media: [{
		title: String,
		description: String,
		type: String
	}]
});

mongoose.model('Posts', PostsSchema);