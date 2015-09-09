module.exports = function(app) {
	var journal = require('../controllers/journal.server.controller');
	app.get('/journal', journal.render);
};