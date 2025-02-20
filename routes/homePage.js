const path = require("express");
const express = require("express");
const bookModel = require("../models/booksSchema");

const router = express.Router()
// const adminPanelData = require

router.get("/", async (req, res)=>{
    try{
        const books = await bookModel.find();
        return res.render("homePage", {books});
    }catch(err){
        console.log(err.message)
    }
})

module.exports = router
