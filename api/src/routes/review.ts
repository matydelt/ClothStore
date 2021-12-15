import express from "express"
import ReviewControllers from "../controllers/reviewControllers";
const router = express.Router();


router.get("/review/:publicationId/:authorId", ReviewControllers.getReview)
router.post("/review", ReviewControllers.setReview)
router.get("/reviews/:publicationId", ReviewControllers.getReviews)

module.exports = router;