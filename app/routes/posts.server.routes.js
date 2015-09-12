var posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app) {
	app.route('/posts')
		.post(posts.create)
		.get(posts.render);

	app.route('/posts/:category')
		.get(posts.read);

	app.param('category', posts.postsByCategory);
};