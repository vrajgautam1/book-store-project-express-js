const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    bookName:{required:true, type: String},

    publication:{required:true, type: String},

    author:{required:true, type: String},

    actualPrice:{required:true, type: Number},

    finalPrice:{required:true, type: Number},

    imgUrl:{required:true, type: String},

    tags:{type: Array},

    bookQuantity:{type: Number},
},{
    timestamps: true 
})

let bookModel = mongoose.model("bookModel", bookSchema);

module.exports = bookModel