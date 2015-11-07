var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	app.route('/signin')
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));

	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.get('/signout', users.signout);
};