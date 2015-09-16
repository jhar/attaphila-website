process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Configs
var config = require('./config/config'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');

var db = mongoose(),
	app = express(),
	passport = passport();

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at ' + config.ip_address + " on port " + config.port);