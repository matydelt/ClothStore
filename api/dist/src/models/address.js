"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, "falta calle"],
    },
    suite: {
        type: String,
        required: [true, "falta numero"],
    },
    city: {
        type: String,
        required: [true, "falta ciudad"],
    },
    country: {
        type: String,
        required: [true, "falta País"],
    },
    cp: {
        type: String,
        required: [true, "falta Codigo postal"],
    },
});
exports.default = (0, mongoose_1.model)("Address", AddressSchema);
