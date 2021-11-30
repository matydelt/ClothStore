import express from "express";
import UserController from "../controllers/userControllers";
const router = express.Router();

router.post("/auth/new", UserController.setUser);
router.get("/auth", UserController.getUser);
router.get("/auth/:id", UserController.getOneUser); //trae un solo usuario
router.put("/auth", UserController.banUser);

module.exports = router;
