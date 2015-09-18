var Post = require('mongoose').model('Posts');

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
