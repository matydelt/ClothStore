import express from "express"
import PublicationController from "../controllers/publicationControlles";
const router = express.Router();

router.get("/publications", PublicationController.getPublications)
router.get("/publication", PublicationController.getPublication)
router.post("/publications/new", PublicationController.setPublication)
router.delete("/publications/:_id", PublicationController.deletePublications)
router.put("/publications/stock", PublicationController.putStock)
module.exports = router;