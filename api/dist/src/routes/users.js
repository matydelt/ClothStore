"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const router = express_1.default.Router();
router.post("/auth/new", userControllers_1.default.setUser);
router.post("/auth/google", userControllers_1.default.setUserGoogle);
router.get("/auth", userControllers_1.default.getUser);
router.get("/usersname", userControllers_1.default.getUserName);
router.get("/auth/:id", userControllers_1.default.getOneUser); //trae un solo usuario
router.put("/auth", userControllers_1.default.banUser); //bann control
router.put("/auth/update", userControllers_1.default.updateUser); //actualiza todos los datos menos el email y el domicilio
router.put("/auth/domicilio", userControllers_1.default.updateAddress); //agrega un domicilio
router.put("/user/putype", userControllers_1.default.putStateUser); //sede tipo empleado y lo quita
router.get("/users", userControllers_1.default.getUsers); //arreglo de usuarios para admin
router.get("/auth/email/:email", userControllers_1.default.getOneUserByEmail); //trae un solo usuario
module.exports = router;
