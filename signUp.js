var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

// body parser Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Home Page
var homepage = path.join(__dirname,"signUp.html");
app.get("/", (req , res) => {
    res.sendFile(homepage);
});

// sign in 
app.get("/signin", (req,res) => {
    res.send("You have suceesfully logged in !!");
});

//sign up
app.get("/signup", (req,res) => {
    res.send("You have suceesfully created an Account!!");
    var aa = req.body.email;
    console.log(aa);
});


app.listen(4000, (err)=>{
    if(!err)console.log("server running successful.....")
});