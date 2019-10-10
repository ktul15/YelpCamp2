const   express = require('express'),
        router = express.Router(),
        Campground = require('../models/campground'),
        middleware = require('../middleware/index');

//INDEX - shows all campgrounds
router.get('/', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) console.log(err);
        res.render('campgrounds/index', {
            campgrounds: allCampgrounds
        });
    })
})

//CREATE - add new campground to db
router.post('/', middleware.isLoggedIn, (req, res) => {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const price = req.body.price;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = {
        name: name,
        image: image,
        description: desc,
        price: price,
        author: author
    };
    //create a new campground and save it to a db
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) { 
            req.flash('error', err.message);
            res.redirect('back');
        }
        else{
            req.flash('success', 'New Campground Added');
            //redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    })

})

//NEW - shows a form to create new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

//SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
    //find a campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if (err) console.log(err);
        //render show template with that campground
        res.render('campgrounds/show', {
            campground: foundCampground
        });
    })
})

//EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', {campground: foundCampground});
    })
})

//UPDATE
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCapground) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else {
            //redirect somewhere
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

//DESTROY
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err, deletedCamground) => {
        req.flash('success', 'Campground Deleted Successfully');
        res.redirect('/campgrounds');
    })
})

module.exports = router;