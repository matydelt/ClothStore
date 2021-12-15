"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinaryController_1 = __importDefault(require("../controllers/cloudinaryController"));
const router = express_1.default.Router();
router.post("/imageupload", cloudinaryController_1.default.imageUpload);
router.post("/removeimage", cloudinaryController_1.default.removeImage);
module.exports = router;
