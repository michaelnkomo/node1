const express = require("express");
const path = require("path");
var exphbs = require("express-handlebars");

const app = express();


const middleware = (req,res,next)=>{
    console.log("This is my middleware..");
    //res.send("Middleware Boss")
    next()
}


// handle bars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// middleware
app.use(middleware);

// body parse to post data
app.use(express.json());

// body parse to handle forms
app.use(express.urlencoded({extended:false}));

// Members API router
app.use("/api/members",require("./routes/api/members"));

// Get Home page
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
});


//console.log(process.env.NODE_ENV);

//console.log(exphbrs);

// Set the port
app.listen(5000, (err)=>{
    if(!err)console.log("succesful connected to server on port 5000 .......")
})
