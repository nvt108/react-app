// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
//
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("react_app");
//     var myobj = {name: 'Nguyen 1', email: 'nguyen1@gmail.com', phone: '0975 256 932'};
//     dbo.collection("users").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("react_app");
    var ObjectId = require('mongodb').ObjectID;
    var myquery = { _id: new ObjectId("5f2295e06292c849ec4c9d9f") };
    var newvalues = { $set: {name: "Hehe", email: "mickey@gmail.com" } };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
});

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
//
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("react_app");
//     dbo.collection("users").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });