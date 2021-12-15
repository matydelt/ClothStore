"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const denunciationController_1 = __importDefault(require("../controllers/denunciationController"));
const router = express_1.default.Router();
router.post("/denunciation/post", denunciationController_1.default.set);
router.get("/denunciation/get", denunciationController_1.default.get);
router.delete("/denunciation/delete/:id", denunciationController_1.default.delete);
router.put("/denunciation/put", denunciationController_1.default.put);
module.exports = router;
