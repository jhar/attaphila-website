var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostsSchema = new Schema({
	title: String,
	body: String,
	category: String,
	coverPhotoURL: String
});

mongoose.model('Posts', PostsSchema);