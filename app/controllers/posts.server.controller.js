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

exports.hasAuthorization = function(req, res, next) {

    console.log(req.post);

    if (req.post.creator.id !== req.user.id) {
        return res.status(403).sent({
            message: 'User is not authorized'
        });
    }

    next();

};

exports.postById = function(req, res, next, id) {

    Post.findById(id).populate('creator', 'username').exec(function(err, post) {
        if (err) return next(err);
        if (!post) return next(new Error('Failed to load post' + id));
        req.post = post;
        next();
    });

};

exports.list = function(req, res) {

    Post.find().sort('-created').populate('creator', 'username').exec(function(err, posts) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(posts);
        }
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

exports.read = function(req, res) {

    res.json(req.post);

};

exports.update = function(req, res) {

    var post = req.post;
    post.title = req.body.title;
    post.content = req.body.content;

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

exports.delete = function(req, res) {

    var post = req.post;

    post.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(post);
        }
    });

};
