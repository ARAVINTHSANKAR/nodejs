var mongoose = require('mongoose');

var schema = mongoose.Schema;
var ObjectId = schema.ObjectId

var userDetail = new schema({
    user_id : ObjectId
    ,name: String
    ,age: Number
    ,city: String
    ,password: String
    ,role: String 
});

var userSchema = mongoose.model('userDetail', userDetail);
module.exports = userSchema;