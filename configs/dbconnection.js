const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://gautamvraj1999:12345@cluster0.e56wc.mongodb.net/BookStore");

const db = mongoose.connection;

db.on("error", (err)=>{
    console.log(err.message);
})

db.once("open", ()=>{
    console.log("Database Connected Successfully");
})

module.exports = db;