var uploads = require('../../app/controllers/uploads.server.controller');

module.exports = function(app) {
	app.route('/uploads')
		.get(uploads.signS3);
};