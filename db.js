var app=require('./app');
var mongo=require('mongodb').MongoClient;
var DB=null;
var url = 'mongodb://localhost:27017/quotes';

exports.connect=function(cb) {
  mongo.connect(url,function(err,result){
      DB=result;
      cb(err,result);
  });

    }



    exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
        return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();
        });
        done();
    }).catch(done);
};