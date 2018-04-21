var userSchema = require('../app/userSchema');
var accountDetailSchema = require('../app/accountDetailSchema');
var jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');

var now = new Date()
var exports = module.exports ={}

module.exports = {

    addNewUser : (reqObj) => {
        var newUser = new userSchema({
            name: reqObj.body.name
            ,age: reqObj.body.age
            ,city: reqObj.body.city
            ,password: reqObj.body.password
            ,role : reqObj.body.role
        });
        newUser.save();
        return "success";
    },

    authenticateLogin : async (reqObj) => {

        var responseObj = {};
        console.log(reqObj.body.name);
        var auth = await userSchema.find({name: reqObj.body.name}, (err, data) => {
            if(err) { console.log(err) }
            else if(!data || data.length == 0) {
                console.log("no data"); 
                responseObj.status = "no data";
            }
        });

        if(responseObj.status != "no data" &&  auth[0].password == reqObj.body.password) {
            var payLoad = {
                name : auth[0].name,
                city : auth[0].city
            }        
            var validToken = await jwt.sign(payLoad, "privateKey");
            if(!validToken) {
                responseObj.status = "Failed to generate token";
                return responseObj;
            } else {
                responseObj.status = "success";
                responseObj.messege = "Login success";
                responseObj.token = validToken;
                return responseObj;
            }            
        } else {
            responseObj.status = "Failed";
            responseObj.message = "Wrong credentials";
            return responseObj;
        }
    },

    generateToken : async (payLoad) => {

        var ValidToken = await jwt.sign(payLoad, "privateKey" , (err, token) => {
            if(err) { console.log("error in generating token"); }
            else if(token) {
                return token;
            }
        });
    },

    addBankDetails : async (reqObj) => {
        var responseObj = {};
        if(reqObj.headers.token) { 
            try {
                var decoded = await jwt.verify(reqObj.headers.token, "privateKey");
            } catch (err) {
                return responseObj.status = "failed";
            }
            var userDetail = await userSchema.find({name:decoded.name}, (err, data) => {
                if(err) { console.log(err) }
                else if(data) { console.log(data); }
            });
            console.log("userDetailName" +userDetail[0]._id);
            var bankDetail = new accountDetailSchema({
                user_id: userDetail[0]._id
                ,account_number: reqObj.body.accountNumber
                ,balance: reqObj.body.balance
                ,bankName: reqObj.body.bankName
                ,branch: reqObj.body.baranch
                ,created_on: dateFormat(now)
            });
            bankDetail.save();
            responseObj.status = "success";
            responseObj.message = "Bank details insertion successful";
            return responseObj;
        } else {
            responseObj.status = "failed";
            return responseObj;
        } 
    }
}
