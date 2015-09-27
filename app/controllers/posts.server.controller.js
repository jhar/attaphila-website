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

exports.postByID = function(req, res, next, id) {

    Post.findById(id).exec(function(err, post) {
        if (err) return next(err);
        if (!post) return next(new Error('Failed to load post' + id));
        req.post = post;
        next();
    });

};

exports.create = function(req, res, next) {

    var post = new Post(req.body);
    post.creator = req.user;

    post.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(post);
        }
    });

};

exports.list = function(req, res) {

    Post.find().sort('-created').exec(function(err, posts) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(posts);
        }
    });

};

exports.read = function(req, res) {

    res.json(req.posts);

};
