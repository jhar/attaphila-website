var express = require('express'); // basically an import
var app = express();

// respond with "Hello World!" on the homepage
app.get('/', function(req,res) {
	res.send('Hello World!');
});

// respond to a sub-directory
app.get('/sub', function(req,res) {
	res.send('This is a sub-directory!');
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});