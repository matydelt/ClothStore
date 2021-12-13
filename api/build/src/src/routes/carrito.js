"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController_1 = __importDefault(require("../controllers/carritoController"));
const router = (0, express_1.Router)();
router.post('/carrito/:_id', carritoController_1.default.postCarrito);
router.get('/carrito/:email', carritoController_1.default.getCarrito);
router.put('/carrito/:email/:id', carritoController_1.default.putCarrito);
router.put('/carrito/add/:email/:id/:amount', carritoController_1.default.putCarritoAmount);
router.put('/carrito/remove/:email/:id', carritoController_1.default.putCarritoRemove);
module.exports = router;
