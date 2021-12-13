"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DenunciationSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: [true, "falta message"],
    },
    author: {
        type: ["User"],
        ref: "User",
    },
    publication: {
        type: ["Publication"],
        ref: "Publication",
    },
    state: {
        type: Boolean,
        default: false
    }
});
exports.default = (0, mongoose_1.model)("Denunciation", DenunciationSchema);
