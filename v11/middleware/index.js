const   Campground = require('../models/campground'),
        Comment    = require('../models/comment');

//all the middlewares
let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //check if user is logged in
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                req.flash('error', err.message);
                res.redirect('back');
            } 
            else 
            {
                //check if user owns a campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } 
                else {
                    req.flash('error', 'You don\'t have permission to do that');
                    //redirect somewhere if user doesn't own a campground
                    res.redirect('back');
                }
            }
        })
    } 
    else {
        req.flash('error', 'You have to Log In first!');
        //redirect somewhere if not logged in
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //check if user is logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash('error', err.message);
                res.redirect('back');
            } else {
                //check if user owns a campground
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that');
                    //redirect somewhere if user doesn't own a campground
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'You have to Log In first!');
        //redirect somewhere if not logged in
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error', 'Please Log In First!');
        res.redirect('/login');
    }
}

module.exports = middlewareObj;