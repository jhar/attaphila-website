var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

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
	coverPhotoURL: String,
	created: {
		type: Date,
		default: Date.now
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'Users'
	}
});

mongoose.model('Posts', PostsSchema);