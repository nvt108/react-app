var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let mongodb;
const dbName = "react_app";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    mongodb = db.db(dbName);
});
module.exports = {
    getUsers: async function (params) {
        let query = {};
        if(params['keyword'] !== undefined){
            query = { name : new RegExp(params.keyword, 'i') };
        }
        return new Promise((resolve, reject) => {
            mongodb.collection("users").find(query).toArray(function(err, result) {
                if (err) reject(err);
                // console.log("database",result);
                resolve(result);
            });
        });
    },
    updateUsers: async function (params) {
        let ObjectId = require('mongodb').ObjectID;
        let myQuery = {_id: ObjectId(params._id)};
        let newvalues = { $set: params.data };
        return new Promise((resolve, reject) => {
            mongodb.collection("users").updateOne(myQuery, newvalues, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    },

    addUsers: async function (params) {
        return new Promise((resolve, reject) => {
            mongodb.collection("users").insertOne(params, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    },

    deleteUser: async function (params) {
        let ObjectId = require('mongodb').ObjectID;
        let myQuery = {_id: ObjectId(params._id)};
        return new Promise((resolve, reject) => {
            mongodb.collection("users").deleteOne(myQuery, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
};