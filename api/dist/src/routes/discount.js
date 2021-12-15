"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const discountController_1 = __importDefault(require("../controllers/discountController"));
const router = (0, express_1.Router)();
router.post('/discount', discountController_1.default.postDiscount);
router.post('/discount/remove', discountController_1.default.removeDiscount);
module.exports = router;
