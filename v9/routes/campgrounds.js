const   express                 = require('express'),
        router                  = express.Router(),
        Campground              = require('../models/campground');

//INDEX - shows all campgrounds
router.get('/', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err) console.log(err);
        res.render('campgrounds/index', {campgrounds: allCampgrounds});
    })
})

//CREATE - add new campground to db
router.post('/',isLoggedIn, (req, res) => {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = {name: name, image, image, description: desc, author: author};
    //create a new campground and save it to a db
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) console.log(err);
        //redirect back to campgrounds page
        res.redirect('/campgrounds');
    })
    
})

//NEW - shows a form to create new campground
router.get('/new',isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

//SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
    //find a campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if(err) console.log(err);
        //render show template with that campground
        res.render('campgrounds/show', {campground: foundCampground});
    })
    
})

//EDIT
router.get('/:id/edit', (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) console.log(err);

        res.render('campgrounds/edit', {campground: foundCampground}); 
    })
})
//UPDATE
router.put('/:id', (req, res) => {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCapground) => {
        if(err) console.log(err);

        res.redirect('/campgrounds/' + req.params.id);
    })
    //redirect somewhere
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.render('login');
}

module.exports = router;