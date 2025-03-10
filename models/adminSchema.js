const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true} 
});

const adminModel = mongoose.model("adminModel", adminSchema);

module.exports = adminModel;

