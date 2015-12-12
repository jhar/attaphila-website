var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport'),
	multer = require('multer'),
	upload = multer({ dest: 'public/img/' });

module.exports = function() {
	var app = express();

	// Miscellaneous
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(express.static('./public/dist/'));
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

	app.post('/public/img', upload.single('file'), function(req, res, next) {
		console.log(req.file);
		if (!req.file) {
			next();
		} else {
			var fullPath = req.file.path;
			var shortPath = fullPath.slice(7);
			return res.status(201).send({
				message: shortPath
			});
		}
	});

	app.get('/uploads')

	// Routes
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/posts.server.routes.js')(app);

	return app;
};