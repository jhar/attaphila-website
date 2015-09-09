module.exports = function(app) {
	var scrapbook = require('../controllers/scrapbook.server.controller');
	app.get('/scrapbook', scrapbook.render);
};