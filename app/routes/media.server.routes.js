module.exports = function(app) {
	var media = require('../controllers/media.server.controller');
	app.get('/media', media.render);
};