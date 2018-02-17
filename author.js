var mongoose = require('mongoose');

var schema = mongoose.Schema;

var firstAuthor = new schema({
    aName : String,   
    books : [{ type : schema.Types.ObjectId, ref: 'Book'}] 
});


var authors = mongoose.model('Author', firstAuthor);

module.exports = authors;