"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DiscountSchema = new mongoose_1.Schema({
    active: {
        type: Boolean,
        default: false
    },
    percentage: {
        type: Number,
        // default: 0,
        min: 1,
        max: 100
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "necesita id de author"]
    },
    publication: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "necesita id de publicación"]
    },
    expireAt: {
        type: Date,
        // default:  Date.now,
        // expires: '0s'
    },
    amount: {
        type: Number
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Discount", DiscountSchema);
