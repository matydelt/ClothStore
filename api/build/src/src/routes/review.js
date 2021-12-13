"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewControllers_1 = __importDefault(require("../controllers/reviewControllers"));
const router = express_1.default.Router();
router.post("/review", reviewControllers_1.default.setReview);
router.get("/reviews/:publicationId", reviewControllers_1.default.getReviews);
module.exports = router;
