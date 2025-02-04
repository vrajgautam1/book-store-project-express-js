const path = require("path")
const express = require("express")
const { error } = require("console")
const router = express.Router()

let adminCredentials = {}

router.get("/adminSignUp", (req, res)=>{
    res.render("adminSignUp")
})

router.post("/adminSignUp", (req, res)=>{
    const{email, password} = req.body;
    adminCredentials.email = email;
    adminCredentials.password = password;
    res.redirect("/adminLogin")
})

router.get("/adminLogin", (req, res)=>{
    res.render("adminLogin", {error: null})
})

router.post("/adminLogin", (req, res)=>{
    const {email, password} = req.body;
    
    if(email === adminCredentials.email && password === adminCredentials.password){
        res.redirect("/adminPanel");
    }else{
        res.render("adminLogin", {error: "Invalid email or password"})
    }
})

module.exports = router