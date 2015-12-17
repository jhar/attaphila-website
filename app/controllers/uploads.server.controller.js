var config = require('../../config/config'),
    aws = require('aws-sdk');

exports.signS3 = function(req, res) {
    console.log(config);
    aws.config.update({accessKeyId: config.s3_key, secretAccessKey: config.s3_secret});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: config.s3_bucket,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data) {
       if (err) {
           console.log(err);
       } else {
           var return_data = {
               signed_request: data,
               url: 'https://' + config.s3_bucket + '.s3.amazonaws.com/' + req.query.file_name
           };
           res.write(JSON.stringify(return_data));
           res.end();
       }
    });
};