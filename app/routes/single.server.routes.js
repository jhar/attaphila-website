module.exports = function(app) {
	var single = require('../controllers/single.server.controller');
	app.get('/single', single.render);
};