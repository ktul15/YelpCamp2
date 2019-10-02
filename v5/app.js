const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        seedDB          = require('./seeds');

// seedDB();

const Campground = require('./models/campground');
const Comment = require('./models/comment');

mongoose.connect('mongodb://localhost/ycdb_2');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('landing');
})

//INDEX - shows all campgrounds
app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err) console.log(err);
        res.render('campgrounds/index', {campgrounds: allCampgrounds});
    })
})

//CREATE - add new campground to db
app.post('/campgrounds', (req, res) => {
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
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

//SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
    //find a campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if(err) console.log(err);
        //render show template with that campground
        res.render('campgrounds/show', {campground: foundCampground});
    })
    
})

//================================================
//COMMENTS
//================================================

app.get('/campgrounds/:id/comments/new', (req, res) => {
    //find campground by provided id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) console.log(err);
        res.render('comments/new', {campground: foundCampground});
    })
})

app.post('/campgrounds/:id/comments', (req, res) => {
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

app.listen(8000, () => {
    console.log('Server Started!');
})

        // const campgrounds = [
        //     {name: 'Prince Desert Camp', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        //     {name: 'Herkimer Diamond KOA', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        //     {name: 'Jellystone Park Larkspur', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        //     {name: 'Prince Desert Camp', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        //     {name: 'Herkimer Diamond KOA', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        //     {name: 'Jellystone Park Larkspur', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        //     {name: 'Prince Desert Camp', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        //     {name: 'Herkimer Diamond KOA', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        //     {name: 'Jellystone Park Larkspur', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
        // ]