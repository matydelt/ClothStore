import express from "express"
import QAndAControllers from "../controllers/qAndAControllers";

const router = express.Router();


router.post("/question", QAndAControllers.setQuestion);
router.post("/answer", QAndAControllers.setAnswer);
router.get("/qandas/:publicationId", QAndAControllers.getQAndAs);



module.exports = router;