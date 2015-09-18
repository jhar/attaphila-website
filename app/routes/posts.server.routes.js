var posts = require('../../app/controllers/posts.server.controller');
	Post = require('mongoose').model('Posts');

module.exports = function(app) {
	app.route('/posts')
		.post(posts.create);

	app.route('/:category')
		.get(posts.read);

	app.param('category', function(req, res, next, category) {
		Post.postsByCategory(category, function(err, posts) {
			if (err) {
                return next(err);
            } else {
                req.posts = posts;
                next();
            }
		});
	});

};