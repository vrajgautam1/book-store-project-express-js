const path = require("path")
const express = require("express");
const app = express()
const dbconnection = require("./configs/dbconnection")
const adminModel = require("./models/adminSchema")
const bodyParser = require("body-parser")

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))

const loginRoute = require("./routes/adminLogin")
app.use(loginRoute)

const adminPanelRoute = require("./routes/adminPanel")
app.use(adminPanelRoute)

const homePageRoute = require("./routes/homePage")
app.use(homePageRoute)

const port = process.env.PORT || 3000;
app.listen(port, (err)=>{
    if(!err){
        console.log("Server is running on");
        console.log("http://localhost:"+port)
    }
})