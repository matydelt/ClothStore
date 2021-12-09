import express from "express"
import DenunciationController from "../controllers/denunciationController";
const router = express.Router();


router.post("/denunciation/post", DenunciationController.set)
router.get("/denunciation/get", DenunciationController.get)
router.delete("/denunciation/delete", DenunciationController.delete)
router.put("/denunciation/put", DenunciationController.put)

module.exports = router;