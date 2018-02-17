var mongoose = require('mongoose');


var bookSchema = require('../model/book');
var authorSchema =  require('../model/author');
var dbConnection = require('../db');

// var kudeep = new authorSchema({
//     aName : 'kudeep shiv'
// });

// var firstBook = new bookSchema({
//     bname : 'zoology',
//     bColour : 'red',
//     author :  kudeep._id
// });

// var secondBook = new bookSchema({
//     bname : 'botany',
//     bColour : 'green',
//     author :  kudeep._id
// });

// kudeep.save(function(err) {
//     if(err) throw err;
//     console.log("author insertion success");
// });

// secondBook.save(function(err) {
//     if(err) throw err;
//     console.log("book2 insertion success");
// });



bookSchema.find({bColour : 'red'})
    .populate('author')
    .exec(function(err,book) {
        if(err) throw err;
        console.log(book);           
        console.log(book[0].author.aName);      
    });
    