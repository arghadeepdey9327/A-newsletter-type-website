const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
    
});
app.post("/",function(req,res){
    
    var a=req.body.first;
    var b=req.body.second;
    var c=req.body.third;
    var data={
       members: [
                   {
                       email_address: c,
                       status: "subscribed",
                       merge_fields: {
                           FNAME: a,
                            lname: b
                       }
                   }
       ]
    };

const url= "https://us17.api.mailchimp.com/3.0/lists/c10d71edfb";
const gh= JSON.stringify(data);
options={
    method:"POST",
    auth:"CodeEasy:8a42203b17c3152bf1823699f3dc69b8-us17"
}
const request=https.request(url,options,function(response){

    response.on("data",function(data){
        console.log(JSON.parse(data));
       
    })
  

})
request.write(gh);
res.sendFile(__dirname+"/success.html");
request.end();
});

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is running in port 3000");
});
// 8a42203b17c3152bf1823699f3dc69b8-us17
// c10d71edfb