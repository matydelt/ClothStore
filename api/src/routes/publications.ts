import express from "express"
import PublicationController from "../controllers/publicationControlles";
const router = express.Router();

router.post("/publications/new", PublicationController.setPublication)

module.exports = router;