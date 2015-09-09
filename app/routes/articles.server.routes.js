module.exports = function(app) {
	var articles = require('../controllers/articles.server.controller');
	app.get('/articles', articles.render);
};