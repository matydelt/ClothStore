import express from "express"
const router = express.Router();

import UserController from "../controllers/userControllers";
import PublicationController from "../controllers/publicationControlles";

// console.log(BooksController.setBook)
router.post("/auth/new", UserController.setUser)
router.post("/products/new", PublicationController.setPublication)
router.get("/products", PublicationController.getPublications)
// router.put("/products/edit", PublicationController.putPublication)
// router.get("/auth/get", UserController.getUser)

module.exports = router;
