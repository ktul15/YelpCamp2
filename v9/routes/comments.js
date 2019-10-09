const   express                 = require('express'),
        router                  = express.Router({mergeParams: true}),
        Campground              = require('../models/campground');
        Comment                 = require('../models/comment');

//comments new
router.get('/new', isLoggedIn, (req, res) => {
    //find campground by provided id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) console.log(err);
        res.render('comments/new', {campground: foundCampground});
    })
})

//comment create
router.post('/', (req, res) => {
    //find campground using id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) console.log(err);

        //create new comment
        Comment.create(req.body.comment, (err, newlyCreatedComment) => {
            if(err) console.log(err);

            //add username and id to comment
            newlyCreatedComment.author.id = req.user._id;
            newlyCreatedComment.author.username = req.user.username;
            //save comment
            newlyCreatedComment.save();
            //connect new comment to campground
            foundCampground.comments.push(newlyCreatedComment);
            foundCampground.save();
            res.redirect('/campgrounds/' + req.params.id);
        })
    })
})

//comment edit
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
    //find comment by id 
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) res.redirect('back');

        res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
    })
})

//comment update
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
    //find comment by provided id and update
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) res.redirect('back');

        res.redirect('/campgrounds/' + req.params.id);
    })
})

//comment destroy
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, deletedComment) => {
        if(err) res.redirect('back');

        res.redirect('/campgrounds/' + req.params.id);
    })
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.render('login');
}

function checkCommentOwnership(req, res, next) {
    //check if user is logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) res.redirect('back');

            //check if user owns a campground
            if (foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                //redirect somewhere if user doesn't own a campground
                res.redirect('back');
            }
        })
    } else {
        //redirect somewhere if not logged in
        res.redirect('back');
    }
}

module.exports = router;
