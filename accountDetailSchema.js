var mongoose = require('mongoose');

var schema = mongoose.Schema;
var ObjectId = schema.ObjectId

var accountDetail = new schema({
    account_id : ObjectId
    ,user_id: { type: ObjectId, ref: 'userDetail'}
    ,account_number: Number
    ,balance: Number
    ,bankName: String
    ,branch: String
    ,created_on: { 
        type: Date 
       ,default: Date.now
    }
});

var accountDetailSchema = mongoose.model('accountDetail', accountDetail);
module.exports = accountDetailSchema;