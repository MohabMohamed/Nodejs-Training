console.log("hello world!");

const request = require("request");
request.get("https://reqres.in/api/user/2",
(err,resp,body)=> {
    if(err)
    {
        console.log("there's an error!");
        console.log(err);
        return;
    }
    console.log(resp.statusCode);
    console.log(body);

});

console.log("after");