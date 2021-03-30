const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const seeds = [
    {
        name: 'Prince Desert Camp',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
    },
    {
        name: 'Herkimer Diamond KOA',
        image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
    },
    {
        name: 'Jellystone Park Larkspur',
        image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        description: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, (err) => {
        // if(err) console.log(err);
        // console.log('removed Campgrounds');

        // //add a few campgrounds
        // seeds.forEach(function(seed){
        //     Campground.create(seed, (err, newlyCreatedCampground) => {
        //         if(err) console.log(err);
        //         console.log('Added a capground');

        //         //create a comment
        //         Comment.create(
        //             {
        //                 text: 'text',
        //                 author: 'author'
        //             }, (err, newlyCreatedComment) => 
        //             {
        //                 if(err) console.log(err);
        //                 newlyCreatedCampground.comments.push(newlyCreatedComment);
        //                 newlyCreatedCampground.save();
        //                 console.log('Created a new comment.');
        //             }
        //         )
        //     })
        // })
    })
}

module.exports = seedDB;
