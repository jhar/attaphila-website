var	users = require('../../app/controllers/users.server.controller'),
	posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app) {
	app.route('/api/posts')
		.get(posts.list)
		.post(users.requiresLogin, posts.create);

	app.route('/api/posts/:category')
		.get(posts.read);

	app.route('/api/posts/:category/:postId')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(users.requiresLogin, posts.hasAuthorization, posts.delete);

	app.param('category', posts.listByCategory);

	app.param('postId', posts.postById);

};