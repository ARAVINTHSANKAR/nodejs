const mongoose = require('mongoose');
const express = require('express');
var jwt = require('jsonwebtoken');
var decorate = require('getter-setter').browser;

var app = express();
var bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/TestAdmin');

var Schema = mongoose.Schema;
const privateKey = "secretCode"; //global

var firedAdminObj = decorate({
    adminName: "Admin2"
});
var Customer = new Schema({
    userName: String,
    age: String,
    city: String
});

var Admin = new Schema({
    adminName: String,
    password: String,
    incharge: String    
});

var MyModel = mongoose.model('Customers', Customer);
var MyAdminModel = mongoose.model('Admin', Admin);

app.use(bodyParser.json());

app.post('/saveCustomer' , (req, res) => {
    var newCustomer = new MyModel({
        userName: req.body.userName,
        age: req.body.age,
        city: req.body.city
    });
    newCustomer.save();    
    var resObj = {
        status : "New Customer Inserted"
    }
    res.send(resObj);
});

app.post('/saveAdmin' , (req, res) => {
    var newAdmin = new MyAdminModel({
        adminName: req.body.adminName,
        password: req.body.password,
        incharge: req.body.incharge
    });
    newAdmin.save();    
    var resObj = {
        status : "New Admin Inserted"
    }
    res.send(resObj);
});

app.get('/getData' , async (req, res) => {
    var dbData = await MyModel.find({}, (err, data) => {
        if (err) { console.log(err); }
        else if(data) { console.log(data); }
    });
    var obj = {
        resposne : "success",        
        dbData : dbData
    }
    res.send(obj);
});

app.post('/adminLogin', async (req, res) => {
    var auth = await MyAdminModel.find({adminName: req.body.adminName}, (err, data) => {
        if(err) { console.log(err) }
        else if(data) { console.log(data); }
    });
    if(auth[0].password == req.body.password) {
        var payLoad = {
            adminName : auth[0].adminName,
            incharge : auth[0].incharge
        }        
       var ValidToken = await jwt.sign(payLoad, privateKey , (err, token) => {
            if(err) { console.log("error in generating token"); }
            else if(token) { 
                var resObj = {
                    status : "Login Success",
                    token : token
                }
                res.send(resObj); 
            }
        });

    } else { res.send( { status : "Login Failed" } ); }
});

app.get('/getCustomers' , async (req, res) => {
    
    var someAdminName = firedAdminObj.get('adminName');
    
    if(req.headers.token) {    
        try {
            var decoded = await jwt.verify(req.headers.token, privateKey);                                    
        } catch (err) {
            res.send( { Status: "Invalid Token" } );
        }                
        if(someAdminName == decoded.adminName) { 
            var resObj = { 
                Status: "Your session is flushed by SuperAdmin",
                SuperAmin: "Mr.Aravinth"
            }
            res.send(resObj) 
        }
        else {
        var sivakasiCustomers = await MyModel.find({city:decoded.incharge}, (err, data) => {
            if(err) { console.log(err) }
            else if(data) { console.log(data); }
        });
            
    var resObj = {
        decodedToken: sivakasiCustomers
    }
        res.send(resObj);
    } 
} else { 
    var resObj = { 
        Status : "Authentication Failed"
    }
    res.send(resObj) 
}
});

app.get('/superAdmin/getAdminDetails', async (req, res) => {
    var TotalAdmins = await MyAdminModel.find({}, (err, data) => {
        if(err) { console.log(err) }
        else if(data) { console.log(data); }
    });
    res.send(TotalAdmins);
});

app.get('/expireParticularAdmin', (req, res) => {
    console.log(req.headers.adminname);
    if(req.headers.adminname) {        
        firedAdminObj.set('adminName', req.headers.adminname);
        res.send(req.headers.adminname +" "+"session is expired");
    } else {
        res.send( { message: "Kindly mention Admin Name"} )
    }
});




// function protofun() {}

// protofun.prototype.secretBool = "";
//         protofun.prototype.SetValidInvalid = function (adminName) {
//             protofun.prototype.secretBool = adminName;            
//         }
//         protofun.prototype.getValidInvalid = function () {
//             return protofun.prototype.secretBool;
//         }
// protofun.prototype.SetValidInvalid = function () {
//     this.secretBool.push("Admin2");            
// }


app.listen(8080, () => {
    console.log("Listening");
});