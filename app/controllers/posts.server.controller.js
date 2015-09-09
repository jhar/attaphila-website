var Post = require('mongoose').model('Posts');

exports.create = function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(post);
        }
    });
};

exports.list = function(req, res, next) {
	Post.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(posts);
		}
	});
};