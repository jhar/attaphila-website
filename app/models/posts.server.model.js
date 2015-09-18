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
		required: true,
		enum: ['articles', 'blog', 'comics', 'media']
	},
	coverPhotoURL: String,
	created: {
		type: Date,
		default: Date.now
	}
});

PostsSchema.statics.postsByCategory = function (category, callback) {
	this.find({category: category}).
		sort({created: -1}).
		exec(callback);
};

mongoose.model('Posts', PostsSchema);