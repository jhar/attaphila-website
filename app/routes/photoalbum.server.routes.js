module.exports = function(app) {
	var photoalbum = require('../controllers/photoalbum.server.controller');
	app.get('/photoalbum', photoalbum.render);
};