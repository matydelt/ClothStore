"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PublicationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "falta product name"]
    },
    images: {
        type: [{
                public_id: String,
                url: String,
                _id: false
            }],
        required: true
    },
    stock: {
        type: Number,
        required: [true, "falta stock"]
    },
    stockInicial: {
        type: Number,
    },
    mark: {
        type: String,
        required: [true, "necesita una marca"]
    },
    detail: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "necesita precio"]
    },
    category: {
        type: String,
        required: [true, "se require categoria valida"],
        enum: ["Remera", "Patanlon", "Zapatillas", "Zapatos"]
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "necesita id de author"]
    },
    gender: {
        type: String,
        required: [true, "necesita un gender"],
        enum: ["Hombre", "Mujer", "Niños"]
    },
    order: {
        type: String,
    },
    reviews: {
        type: ["Review"],
        ref: "Review",
    },
    state: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
    },
    isRejected: {
        type: Boolean,
        default: false
    },
    discount: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Discount'
    }
});
exports.default = (0, mongoose_1.model)("Publication", PublicationSchema);
