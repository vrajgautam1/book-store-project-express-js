const path = require("path")
const express = require("express");
const app = express()

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({extended:true}));

const loginRoute = require("./routes/adminLogin")
app.use(loginRoute)

const adminPanelRoute = require("./routes/adminPanel")
app.use(adminPanelRoute)

const port = process.env.PORT || 3000;
app.listen(port, (err)=>{
    if(!err){
        console.log("Server is running on");
        console.log("http://localhost:"+port)
    }
})