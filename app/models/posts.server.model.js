var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MediaLinksSchema = new Schema({
	url: {
		type: String,
		required: true
	},
	media: {
		type: String,
		required: true,
		enum: ['article', 'youtube', 'photo']
	}
});

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
		enum: ['articles', 'journal', 'photoalbum', 'scrapbook']
	},
	created: {
		type: Date,
		default: Date.now
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'Users'
	},
	medialinks: [MediaLinksSchema],
	coverPhotoURL: String
});

mongoose.model('Posts', PostsSchema);