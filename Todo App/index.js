const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser = require('body-parser');

const dbUrl = "mongodb://localhost:27017";
const dbName = "winter";


app.use(bodyParser.json());


let db ;



MongoClient.connect(dbUrl,(err,client) => 
{
    if(err)return console.log(err);

    console.log("connected");

     db = client.db(dbName);

}
);

app.post('/users',(req,res)=>
{
const user = req.body;
if(typeof user.name === "undefined" || typeof user.email === "undefined" || typeof user.age === "undefined")
{
    res.status(400).send('Bad Request');
    return;
}
db.collection('users').insert(user, (err,result)=>
{
    if(err) console.log(err);
    console.log(result.ops[0]);
    res.json(result.ops[0]);
})

})

app.get('/users',(req,res)=>
{
db.collection("users").find({}).toArray((err,users) =>
{
    if(err) return consle.log("error");
    res.json(users);
}
);
}
)
 
app.get('/users/:id',(req,res)=>
{
db.collection("users").findOne({userid:req.params["id"]},(err,user)=>
{
   if(err) return console.log(err);
   res.json(user); 
}

)
}
)

app.post('/users/:id/todos',(req,res)=>
{
const todo = req.body;
if(typeof user.title === "undefined" || typeof user.description === "undefined")
{
    res.status(400).send('Bad Request');
    return;
}
todo["userid"] = req.params["id"]; 
todo["done"] = false;
db.collection('todos').insert(todo, (err,result)=>
{
    if(err) console.log(err);
    console.log(result.ops[0]);
    res.json({_id:result.ops[0]._id,title:result.ops[0].title
        ,description:result.ops[0].description,
        done:result.ops[0].done  });

})

})

app.get('/users/:id/todos',(req,res)=>
{
db.collection("todos").find({userid:req.params["id"],done:req.query.done},(err,todos)=>
{
   if(err) return console.log(err);
   res.json(todos); 
}

)
}
)



app.listen(3000, () => console.log('Example app listening on port 3000!'));

