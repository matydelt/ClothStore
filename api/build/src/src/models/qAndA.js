"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QAndASchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: [true, "falta message"],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "necesita id de author"]
    },
    publication: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "necesita id de publicación"]
    },
    answer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'QAndA',
        require: [true, "necesita id de la respuesta"]
    },
    isQuestion: {
        type: Boolean
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("QAndA", QAndASchema);
