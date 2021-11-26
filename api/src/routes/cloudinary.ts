import express from "express"
import CloudinaryController from "../controllers/cloudinaryController";

const router = express.Router();


router.post("/imageupload", CloudinaryController.imageUpload);
router.post("/removeimage", CloudinaryController.removeImage);



module.exports = router;