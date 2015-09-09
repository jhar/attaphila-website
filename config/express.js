var config = require('./config'),
	express = require('express');

module.exports = function() {
	var app = express();

	// For Jade
	app.set('views', './app/views');
	app.set('view engine', 'jade');

	// Routes
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/articles.server.routes.js')(app);
	require('../app/routes/journal.server.routes.js')(app);
	require('../app/routes/photoalbum.server.routes.js')(app);
	require('../app/routes/scrapbook.server.routes.js')(app);
	require('../app/routes/post.server.routes.js')(app);
	require('../app/routes/admin.server.routes.js')(app);

	return app;
};