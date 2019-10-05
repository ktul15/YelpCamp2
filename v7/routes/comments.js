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

            //connect new comment to campground
            foundCampground.comments.push(newlyCreatedComment);
            foundCampground.save();
            //redirect
            res.redirect('/campgrounds/' + foundCampground._id);
        })
    })
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.render('login');
}

module.exports = router;
