import express from "express";
import PublicationController from "../controllers/publicationController";
const router = express.Router();

router.put("/publications", PublicationController.putPublications);
router.get("/publication", PublicationController.getPublication);
router.get("/publications", PublicationController.getPublicationsByUser);
router.post("/publications/new", PublicationController.setPublication);
router.delete("/publications/:_id", PublicationController.deletePublications);
router.put("/publications/stock", PublicationController.putStock);
router.get("/publications/marks", PublicationController.getPublicationsMarks);
router.get("/publications/related", PublicationController.getRelatedPublications);
router.put("/publications/state", PublicationController.putPublicationState);
router.post("/publication/message", PublicationController.postPublicationMessageADM);

module.exports = router;
