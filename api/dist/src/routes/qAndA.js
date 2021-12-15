"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qAndAControllers_1 = __importDefault(require("../controllers/qAndAControllers"));
const router = express_1.default.Router();
router.post("/question", qAndAControllers_1.default.setQuestion);
router.post("/answer", qAndAControllers_1.default.setAnswer);
router.get("/qandas/:publicationId", qAndAControllers_1.default.getQAndAs);
module.exports = router;
