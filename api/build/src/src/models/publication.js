"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PublicationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "falta product name"]
    },
    images: {
        type: [],
    },
});
exports.default = (0, mongoose_1.model)("Publication", PublicationSchema);
