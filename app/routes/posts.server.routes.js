var	users = require('../../app/controllers/users.server.controller'),
	posts = require('../../app/controllers/posts.server.controller'),
	Post = require('mongoose').model('Posts');

module.exports = function(app) {
	app.route('/api/posts')
		.get(posts.list)
		.post(users.requiresLogin, posts.create);

	app.route('/api/posts/:postId')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(users.requiresLogin, posts.hasAuthorization, posts.delete);

	app.param('postId', posts.postById);

};