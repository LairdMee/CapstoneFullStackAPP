var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
//var passport = require('passport');
//const mongoose = require('mongoose');
var session = require('express-session');
const MongoDbStore = require('connect-mongo');
const dotenv = require('dotenv');
const e = require('express');
const client = new OAuth2Client("1070674130433-171ritv30q9pbr74edf31mr1r5qgqhb4.apps.googleusercontent.com");

dotenv.config({path: './config.env'})

//passport config
//require('./passport')(passport)

// used to serve static files from public directory
//app.use(express.static('public'));
app.use(cors());
app.use(express.json())

// sessions

//app.use(session({
//    secret: 'keyboard cat',
//    resave: false,
//    saveUnitialized: false
//}))

//app.use(passport.initialize());
//app.use(passport.session());

//app.use('/auth', require('./auth'))

app.get('/', function(req, res) {
    res.send('<h1> This is our express server </h1>');
})


// login user 
app.post('/account/googlelogin', function (req, res) {
    const {tokenId} = req.body;

    client.verifyIdToken({idToken: tokenId, audience: "1070674130433-171ritv30q9pbr74edf31mr1r5qgqhb4.apps.googleusercontent.com"}).then(response => {
        const {email_verified, email, name, given_name, family_name} = response.payload;
        const newUser = {
            email: email,
            displayName: name,
            firstName: given_name,
            lastName: family_name
        }
        if(email_verified) {
            try{
                dal.findOne(email).
                then((user, err) => {
                    if(err){
                        return res.status(400).json({
                            error: "Something went wrong..."
                        })
                    } else {
                        if(user)
                        {
                            console.log(user);
                            const employee = user.Employee ? user.Employee : false;
                            const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'})
                            const {_id, displayName, email, accountType, accountNumber, balance} = user

                            res.json({
                                token,
                                user: {_id, displayName, email, accountType, accountNumber, balance, Employee:employee}
                            })
                        } else{
                            dal.create(newUser).then((user, err) => {
                                if(err){
                                    return res.status(400).json({
                                        error: "Something went wrong..."
                                    })
                                }else {
                                    const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'})
                                    const {_id, displayName, email, accountType, accountNumber, balance} = newUser


                                    res.json({
                                        token,
                                        user: {_id, displayName, email, accountType, accountNumber, balance}
                                    })
                                }
                                console.log(user);
                                         
                            });     
                        }
                    }
                });
            } catch (err)
            {
                console.log(err);
            }
        }
        console.log(response.payload);
    })
    
});

app.get('/account/create/:email/:type', function(req, res){
    const newAccount = 
    { 
        email: req.params.email,
        accountNumber: Math.floor(Math.random() * 1000000000),
        accountType: req.params.type,
        balance: 0
    }
    dal.createAccount(newAccount).
    then((acc, err) => {
        if(err){
            return res.status(400).json({
                error: "Something went wrong..."
            })
        }else {
            console.log(acc);
            res.send(acc);
        }                 
    });          
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

app.get('/account/bank/find/:email', function(req, res){

    dal.findAccount(req.params.email).
        then((response) => {
            console.log(response);
            res.send(response);
        });
})

//find one bank account
app.get('/account/bank/findOne/:account', function(req, res){
    dal.findOneAccount(req.params.account).
        then((response) => {
            console.log(response);
            res.send(response);
        });
})

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:account/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, req.params.account, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3300;
app.listen(port);
console.log('Running on port: ' + port);