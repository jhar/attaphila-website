var	users = require('../../app/controllers/users.server.controller'),
	posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app) {
	app.route('/api/posts')
		.get(posts.list)
		.post(users.requiresLogin, posts.create);

	app.route('/api/posts/:postId')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(users.requiresLogin, posts.hasAuthorization, posts.delete);

	app.route('/api/:category')
		.get(posts.read);

	app.param('postId', posts.postById);

	app.param('category', posts.listByCategory);

};