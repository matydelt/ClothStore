"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ShoppingSchema = new mongoose_1.Schema({
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
    },
    amount: {
        type: Number,
        required: [true, "necesita un amount"]
    },
    date: {
        type: String,
        required: [true, "necesita date"]
    },
    state: {
        type: Boolean,
        required: [true, "necesita un state"]
    },
    status: {
        type: String,
        required: [true, "necesita un status"]
    },
    status_detail: {
        type: String,
        required: [true, "necesita un status_detail"]
    },
    link: {
        type: String,
        required: [true, "necesita un link"]
    }
});
exports.default = (0, mongoose_1.model)("Shopping", ShoppingSchema);
