const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'summer';

MongoClient.connect(url,(err,client) => 
{
    if(err)return console.log("some error!");

    console.log("connected");

    const db = client.db(dbName);
    const collection =  db.collection("users");
    collection.find({}).toArray((err,users) =>
{
    if(err) return consle.log("error");
    console.log(users);
}
);
    client.close();
}
);