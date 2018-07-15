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
//app.get('/', (req, res) => res.send('Hello World!'));

//app.get('/', (req, res) => res.json({Hello: "World"}));

/*app.get('/users/:userId/todo/:todoId', (req, res) => { 
console.log(req.params);
res.send(req.params);
}
);


app.get('/users/:userId/todo/:todoId', (req, res) => { 
    console.log(req.params);
    console.log(req.query);
    res.json({userId :req.params["userId"],todoId :req.params["todoId"],done : req.query.done});
    }
    );
app.post("/users",(req,res) => {

    console.log(req.body);
    res.json({name : 'Mohab'});

})
*/

app.post('/users',(req,res)=>
{
const user = req.body;
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


app.listen(3000, () => console.log('Example app listening on port 3000!'));

