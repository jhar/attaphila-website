var port = process.env.PORT;
var ip_address = process.env.IP;

module.exports = {
	s3_key: process.env.S3_KEY,
	s3_secret: process.env.S3_SECRET,
	s3_bucket: process.env.S3_BUCKET,
	port: port,
	ip_address: ip_address,
	db: 'mongodb://localhost/attaphila',
	sessionSecret: 'developmentSessionSecret'
};