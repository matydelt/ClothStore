"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const publicationControlles_1 = __importDefault(require("../controllers/publicationControlles"));
// console.log(BooksController.setBook)
router.post("/auth/new", userControllers_1.default.setUser);
router.post("/products/new", publicationControlles_1.default.setPublication);
router.get("/products", publicationControlles_1.default.getPublications);
// router.get("/auth/get", UserController.getUser)
module.exports = router;
