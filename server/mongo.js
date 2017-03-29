const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/bilibili';

function locate(db, collection, queryArr, cb) {
    collection.find(...queryArr).toArray((err, res) => {
        cb(res);
        db.close();
    });
}

function count(db, collection, queryArr, cb) {
    collection.aggregate(queryArr).toArray((err, res) => {
        cb(res);
        db.close();
    });
}

function find(collectionName, type, queryArr, callback) {
    MongoClient.connect(DB_CONN_STR, (err, db) => {
        if (err) {
            console.log(`connect err ${err}`);
        } else {
            if (type === 'find') {
                locate(db, db.collection(collectionName), queryArr, callback);
            } else if (type === 'aggregate') {
                count(db, db.collection(collectionName), queryArr, callback);
            }
        }
    });
}

// find('users', 'aggregate', [{$group : {_id : '$sex', total : {$sum : 1}}}], (res) => {
//     console.log(res);
// });
// find('videos', 'aggregate', [{$group : {_id : 'aid', total : {$sum : 1}}}], (res) => {
//     console.log(res);
// });
// find('users', 'aggregate', [{$unwind : '$tlist'}, {$group : {_id : '$tlist.name', total : {$sum : '$tlist.count'}}}], (res) => {
//     console.log(res);
// });

module.exports.find = find;
