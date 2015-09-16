var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	require('../app/models/users.server.model.js');
	require('../app/models/posts.server.model.js');
	return db;
};