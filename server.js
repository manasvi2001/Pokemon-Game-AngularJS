// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port     = process.env.PORT || 9000;
var config   = require('./config.js');
var User     = require('./user.js')

app.use(bodyParser());

mongoose.connect(config.db);

app.all('*',function(req, res, next) {
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
    //next();
});

// set up our express application
app.use(express.static(__dirname));

// signup API
app.post('/signup', function(req, res) {
    console.log(JSON.stringify(req.body));
    var username = req.body.username || "";
    var password = req.body.password || "";
    if(username && password) {
        User.findOne({username: username}, function(err, userData) {
            if(!userData) {
                var userData = new User();
                userData.username = username;
                userData.password = password;
                userData.score = 0;
                userData.save(function(err) {
                    if(err)
                        console.error(err);
                });
                console.log("Successful");
                res.json({success: true, message: "User Successfully created!"});
            } else {
                res.json({success: false, message: "Another user with same username exists!"});
            }
        })
    }
})

// login API
app.get('/login', function(req, res) {
    var username = req.query.username || "";
    var password = req.query.password || "";
    if(username && password) {
        User.findOne({username: username}, function(err, userData) {
            if(!userData) {
                res.json({success: false, message: "No Such User exists"});
            }
            else {
                if(userData.password == password)
                    res.json({success: true, message: "Successful Login"});
                else
                    res.json({success: false, message: "Password Incorrect"});
            }
        })
    }
})

// fetch score
app.get('/fetchscore', function(req, res) {
    var username = req.query.username || "";
    if(username) {
        User.findOne({username: username}, function(err, userData) {
            if(!userData) {
                res.json({success: false, message: "No Such User exists"});
            }
            res.json({success: true, message: "Score Fetching Successful", score: userData.score});
        })
    }
})

// update score
app.post('/updatescore', function(req, res) {
    var username = req.body.username || "";
    var score = req.body.score;
    if(username) {
        User.findOne({username: username}, function(err, userData) {
            if(!userData) {
                res.json({success: false, message: "No Such User exists"});
            }
            userData.score = score;
            userData.save(function(err) {
                console.error(err);
            })
            res.json({success: true, message: "Score Updated"});
        })
    }
})

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);