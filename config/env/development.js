var port = process.env.PORT;
var ip_address = process.env.IP;

module.exports = {
	port: port,
	ip_address: ip_address,
	db: 'mongodb://localhost/attaphila',
	sessionSecret: 'developmentSessionSecret'
};