var port = process.env.PORT || 8080;
var ip_address = '127.0.0.1';

module.exports = {
	s3_key: process.env.AWS_ACCESS_KEY,
	s3_secret: process.env.AWS_SECRET_KEY,
	s3_bucket: process.env.S3_BUCKET,
	port: port,
	ip_address: ip_address,
	db: process.env.MONGOLAB_URI,
	sessionSecret: 'developmentSessionSecret'
};