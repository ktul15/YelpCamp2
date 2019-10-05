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
router.post('/', (req, res) => {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image, image, description: desc};
    //create a new campground and save it to a db
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) console.log(err);
        //redirect back to campgrounds page
        res.redirect('/campgrounds');
    })
    
})

//NEW - shows a form to create new campground
router.get('/new', (req, res) => {
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

module.exports = router;