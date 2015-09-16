var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');

module.exports = function() {
	var app = express();

	// Miscellaneous
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(express.static('./public'));
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// For Jade
	app.set('views', './app/views');
	app.set('view engine', 'jade');

	// Message flashing
	app.use(flash());

	// For Passport
	app.use(passport.initialize());
	app.use(passport.session());

	// Routes
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/posts.server.routes.js')(app);

	return app;
};