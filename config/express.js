var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

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

	// Routes
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/articles.server.routes.js')(app);
	require('../app/routes/journal.server.routes.js')(app);
	require('../app/routes/photoalbum.server.routes.js')(app);
	require('../app/routes/comics.server.routes.js')(app);
	require('../app/routes/post.server.routes.js')(app);
	require('../app/routes/admin.server.routes.js')(app);
	require('../app/routes/posts.server.routes.js')(app);

	return app;
};