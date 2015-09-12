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

exports.render = function(req, res) {
	console.log(req);
	Post.find({}, function(err, posts) {
		if (err) {
			return err;
		} else {
			console.log(posts);
			res.render('posts', { allPosts: posts });
		}
	});
};