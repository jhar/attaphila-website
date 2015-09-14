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
	Post.find({}).
        sort({created: -1}).
        exec(function(err, posts) {
	       if (err) {
			     return err;
		   } else {
		      console.log(posts);
		      res.render('posts', { allPosts: posts });
		  }
        });
};

exports.read = function(req, res) {
    res.json(req.posts);
};

exports.postsByCategory = function(req, res, next, category) {
    Post.find({category: category}).
        sort({created: -1}).
        exec(function(err, posts) {
            if (err) {
                return next(err);
            } else {
                req.posts = posts;
                next();
            }
        });
};