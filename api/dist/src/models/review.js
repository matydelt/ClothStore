"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "falta title"],
    },
    message: {
        type: String,
        required: [true, "falta message"],
    },
    score: {
        type: Number,
        required: [true, "falta score"],
        min: [1, 'No puede ser menor a 1'],
        max: [5, 'No puede ser mayor a 5']
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "necesita id de author"]
    },
    publication: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "necesita id de publicación"]
    },
});
exports.default = (0, mongoose_1.model)("Review", ReviewSchema);
