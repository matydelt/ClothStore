import express from "express";
import PublicationController from "../controllers/publicationController";
const router = express.Router();

router.get("/publications", PublicationController.putPublications);
router.get("/publication", PublicationController.getPublication);
router.post("/publications/new", PublicationController.setPublication);
router.delete("/publications/:_id", PublicationController.deletePublications);
router.put("/publications/stock", PublicationController.putStock);
module.exports = router;
