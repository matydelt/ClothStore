import express from "express"
import UserController from "../controllers/userControllers";
const router = express.Router();


router.post("/auth/new", UserController.setUser)
router.get("/auth", UserController.getUser)


module.exports = router;