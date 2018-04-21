var mongoose = require('mongoose');
var dbConnect = (function dbConnect() {
var mongodb = 'mongodb://localhost:27017/BankDetail';
mongoose.connect(mongodb);

var db = mongoose.connection;
db.on('error', function() {
        console.log('some error during connection');
    });
})();

module.exports = dbConnect;