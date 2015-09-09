module.exports = function(app) {
	var post = require('../controllers/post.server.controller');
	app.get('/post', post.render);
};