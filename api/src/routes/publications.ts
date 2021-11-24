import express from "express"
import PublicationController from "../controllers/publicationControlles";
const router = express.Router();

router.get("/publications", PublicationController.getPublications)
router.post("/publications/new", PublicationController.setPublication)
router.put("/publications/stock", PublicationController.putStock)
module.exports = router;