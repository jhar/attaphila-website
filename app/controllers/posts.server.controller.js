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

    if ((req.post.creator.id !== req.user.id) && (req.user.username != 'justin')) {
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

exports.listByCategory = function(req, res, next, cat) {

    Post.find({category: cat}).sort('-created').populate('creator', 'username').exec(function(err, posts) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            req.post = posts;
            next();
        }
    });

};

exports.create = function(req, res, next) {
    
    console.log(req.body);

    var post = new Post({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        coverPhotoURL: req.body.coverPhotoURL,
        medialinks: []
    });
    
    if (req.body.medialinks) {
        for (i = 0; i < req.body.medialinks.length; i++) {
            post.medialinks.push({
                url: req.body.medialinks[i].url,
                media: req.body.medialinks[i].media
            });
        }
    }

    post.creator = req.user;

    post.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.redirect('/#/posts/' + post.category + "/" + post._id);
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
    post.category = req.body.category;
    post.content = req.body.content;
    post.coverPhotoURL = req.body.coverPhotoURL;
    post.medialinks = req.body.medialinks;

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
