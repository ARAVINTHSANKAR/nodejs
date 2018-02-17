var mongoose = require('mongoose');
var schema = mongoose.Schema;

var books = new schema({
     bName : String,
      bColour : String,      
      author : { type: schema.Types.ObjectId, ref: 'Author' },
});

var books = mongoose.model('Book', books);
module.exports = books;