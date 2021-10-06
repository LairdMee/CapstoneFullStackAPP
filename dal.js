const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb+srv://MLaird:Iamonly_99@cluster0.xwrqc.mongodb.net/myproject1?retryWrites=true&w=majority';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myProject');
})

// create user account
function create(newUser){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = newUser;
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// create bank account
function createAccount(newAccount){
    return new Promise((resolve, reject) => {
        const collection = db.collection('accounts');
        const doc = newAccount;
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err): resolve(doc);
        });
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((docs) => resolve(docs))
            .catch((err) => reject(err));    
    })
}

function findAccount(email){
    return new Promise((resolve, reject) => {
        const accounts = db
            .collection('accounts')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
    })
}

function findOneAccount(account){
    return new Promise((resolve, reject) => {
        const accounts = db
            .collection('accounts')
            .findOne({accountNumber: Number(account)})
            .then((docs) => resolve(docs))
            .catch((err) => reject(err));
        });
}

// update - deposit/withdraw amount
function update(email, account, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('accounts')            
            .findOneAndUpdate(
                {email: email, accountNumber: Number(account)},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );

    });    
}

// all users
function all(){
    var collectionOne = [];
    var collectionTwo = [];
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('accounts')
            .aggregate({
                $lookup:
                {
                   from: "user",
                   localField: "email",
                   foreignField: "email",
                   pipeline: [],
                   as: "user_data"
               }
            })
            .toArray(function(err, docs) {
                console.log(docs);
                err ? reject(err) : resolve(docs)
        });
    })
}


module.exports = {create, createAccount, findOne, findOneAccount, findAccount, find, update, all};