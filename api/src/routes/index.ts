import express from "express"
const router = express.Router();

import UserController from "../controllers/userControllers";

// console.log(BooksController.setBook)
router.post("/auth/new", UserController.setUser)
router.get("/auth/get", UserController.getUser)

module.exports = router;
