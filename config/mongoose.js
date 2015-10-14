var config = require('./config'),
	mongoose = require('mongoose'),
	uriUtil = require('mongodb-uri');

module.exports = function() {
	var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
	var formatted = uriUtil.formatMongoose(config.db);
	console.log(formatted + " is the formatted uri");
	mongoose.connect(formatted, options);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	require('../app/models/users.server.model.js');
	require('../app/models/posts.server.model.js');
	return db;
};