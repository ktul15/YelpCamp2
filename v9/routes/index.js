const   express                 = require('express'),
        router                  = express.Router(),
        User                    = require('../models/user'),
        passport                = require('passport'),
        LocalStrategy           = require('passport-local'),
        passportLocalMongoose   = require('passport-local-mongoose');
    
//root route
router.get('/', (req, res) => {
    res.render('landing');
})

//AUTH ROUTES
//===============================
//show register form
router.get('/register', (req, res) => {
    res.render('register');
})
//handle register logic
router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/campgrounds');
            })
        }
    })
})

//show login form
router.get('/login', (req, res) => {
    res.render('login');
})
//handle login logic
router.post('/login', 
        passport.authenticate('local', {successRedirect: '/campgrounds', failureRedirect: '/login'}), 
        (req, res) => {

        }
)

//logout route
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/campgrounds');
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.render('/login');
}

module.exports = router;
