var Post = require('mongoose').model('Posts');

var getErrorMessage = function(err) {

    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }

};

exports.create = function(req, res, next) {

    var post = new Post({
    	title: req.body.title,
    	body: req.body.body,
    	category: req.body.category,
    	coverPhotoURL: req.body.coverPhotoURL
    });

    post.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(post);
        }
    });

};

exports.read = function(req, res) {

    res.json(req.posts);

};
