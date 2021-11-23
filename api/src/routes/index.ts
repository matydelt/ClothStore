import express from "express"
const router = express.Router();

import BooksController from "../controllers/BooksController";

// console.log(BooksController.setBook)
router.post("/book/new", BooksController.setBook)
router.get("/book/get", BooksController.getBook)

module.exports = router;
