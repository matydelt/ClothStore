"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkoutController_1 = __importDefault(require("../controllers/checkoutController"));
const router = (0, express_1.Router)();
router.post('/checkout', checkoutController_1.default.postCheckout);
router.post('/statusmp', checkoutController_1.default.postMP);
module.exports = router;
