var port = process.env.PORT || 8080;
var ip_address = '127.0.0.1';

module.exports = {
	port: port,
	ip_address: ip_address,
	db: 'MONGOLAB_URI',
	sessionSecret: 'developmentSessionSecret'
};