const   express                 = require('express'),
        router                  = express.Router({mergeParams: true}),
        Campground              = require('../models/campground'),
        Comment                 = require('../models/comment'),
        middleware              = require('../middleware/index');

//comments new
router.get('/new', middleware.isLoggedIn, (req, res) => {
    //find campground by provided id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            req.flash('error', 'Campground not found!');
            res.redirect('back');
        } else{
            res.render('comments/new', {campground: foundCampground});
        }
    })
})

//comment create
router.post('/', middleware.isLoggedIn, (req, res) => {
    //find campground using id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, newlyCreatedComment) => {
            if(err){
                req.flash('error', err.message)
                res.redirect('back');
            } else {
                 //add username and id to comment
                newlyCreatedComment.author.id = req.user._id;
                newlyCreatedComment.author.username = req.user.username;
                //save comment
                newlyCreatedComment.save();
                //connect new comment to campground
                foundCampground.comments.push(newlyCreatedComment);
                foundCampground.save();
                res.redirect('/campgrounds/' + req.params.id);
            }
        })
        }
    })
})

//comment edit
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    //find comment by id 
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    })
})

//comment update
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    //find comment by provided id and update
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            req.flash('error', err.message);
            res.redirect('back');
        } 
        else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

//comment destroy
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, deletedComment) => {
        if(err) { 
            req.flash('error', err.message);
            res.redirect('back');
        } 
        else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

module.exports = router;
