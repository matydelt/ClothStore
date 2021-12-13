"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carritoSchema = new mongoose_1.Schema({
    publications: [
        {
            publication: {
                type: mongoose_1.Types.ObjectId,
                ref: "Publication",
            },
            price: Number,
            quantity: Number,
            image: String,
            title: {
                type: String,
                trim: true
            }
        }
    ],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Carrito', carritoSchema);
