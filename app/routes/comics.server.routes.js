module.exports = function(app) {
	var comics = require('../controllers/comics.server.controller');
	app.get('/comics', comics.render);
};