const path = require("path");
const express = require("express");
const router = express.Router()

const products = []

router.get("/adminPanel", (req, res)=>{
    res.render("adminPanel")
})



module.exports = router