const   express     = require('express'),
        app         = express(),
        bodyParser  = require('body-parser');
        


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


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

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
})

app.post('/campgrounds', (req, res) => {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image, image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect('/campgrounds');
})

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
})

app.listen(8000, () => {
    console.log('Server Started!');
})