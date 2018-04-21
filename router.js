var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var mongoose = require('mongoose');

var db = require('../app/dbConnection');
var mainController = require('../app/mainController')

var app = express();
var resObj = {};
var errObj = { status: "Some Error occured" };

app.use(bodyParser.json());

app.post('/saveUser', (req, res) => {
    var response = mainController.addNewUser(req);
    if(response != "success") {
        res.send(errObj);
    } else {
        resObj.status = "Data insertion successful";
        res.send(resObj);
    }
})

app.post('/userAuthenticate', async (req, res) => {
    if(!req.body) {
        response.status = "Failed";
        response.message = "please enter userName and password";
        res.send(response);
    } else {
    var response = await mainController.authenticateLogin(req);    
        if(!response) {
            res.send("something" +errObj);
        } else {
            res.send(response);
        }
    }
});

app.post('/addBankDetails', async (req, res) => {
    console.log("1");
    var response = await mainController.addBankDetails(req);
    if(!response || response.status != "success") {
        res.send(errObj);
    } else if(response.status == "success") {
        resObj.status = "success";
        resObj.message = response.message;
        res.send(resObj);
    }
});

app.listen(8080, () => {
    console.log('port 8080 is listening');
});
