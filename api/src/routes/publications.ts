import express from "express"
import PublicationController from "../controllers/publicationControlles";
const router = express.Router();

router.get("/publications", PublicationController.getPublications)
router.post("/publications/new", PublicationController.setPublication)
router.delete("/publications/:_id",PublicationController.deletePublications)

module.exports = router;