const path = require("path");
const express = require("express");
const router = express.Router();
const bookModel = require("../models/booksSchema");

const products = [];

router.get("/adminPanel", async (req, res) => {
    try{
        const books = await bookModel.find()
        res.render("adminPanel", {books});
    }catch(err){
        console.log(err.message)
    }
});

router.get("/adminPanel/add-book", (req, res) => {
  return res.render("addbook");
});

router.post("/adminPanel/add-book", async (req, res) => {
  try {
    console.log(req.body);
    await bookModel.create(req.body);
    return res.redirect(req.get("Referrer") || "/adminPanel");
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/adminPanel/view-books", async (req, res) => {
  try {
    const books = await bookModel.find();
    return res.render("viewbooks", { books, error: null });
  } catch (err) {
    console.log(err.message);
    return res.render("viewbooks", { books: [], error: "Error loading books" });
  }
});

router.get("/adminPanel/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await bookModel.findByIdAndDelete(id);
    return res.redirect("/adminPanel/view-books");
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/adminPanel/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    return res.render("editBook", { book });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/adminPanel/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = req.body;
    await bookModel.findByIdAndUpdate(id, updatedBook);
    return res.redirect("/adminPanel/view-books");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
