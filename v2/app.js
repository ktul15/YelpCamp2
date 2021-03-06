const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose');

mongoose.connect('mongodb://localhost/ycdb_2');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});
const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: 'Herkimer Diamond KOA',
//         image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//         description: 'lLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
//     }, (err, newCampground) => {
//         if(err) console.log(err);
//         console.log(newCampground);
//     }
// )

const campgrounds = [
    {name: 'Prince Desert Camp', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
    {name: 'Herkimer Diamond KOA', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
    {name: 'Jellystone Park Larkspur', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
    {name: 'Prince Desert Camp', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
    {name: 'Herkimer Diamond KOA', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
    {name: 'Jellystone Park Larkspur', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
    {name: 'Prince Desert Camp', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
    {name: 'Herkimer Diamond KOA', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
    {name: 'Jellystone Park Larkspur', image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
]

app.get('/', (req, res) => {
    res.render('landing');
})

//INDEX - shows all campgrounds
app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err) console.log(err);
        res.render('index', {campgrounds: allCampgrounds});
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
    res.render('new');
})

//SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
    //find a campground with provided ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) console.log(err);
        //render show template with that campground
        res.render('show', {campground: foundCampground});
    })
    
})
app.listen(8000, () => {
    console.log('Server Started!');
})