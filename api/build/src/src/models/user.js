"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: [true, "falta first name"],
        },
        lastName: {
            type: String,
            required: [true, "falta first name"],
        },
    },
    email: {
        type: String,
        required: [true, "falta email"],
        _id: [true, "violacion de unicidad"],
    },
    password: {
        type: String,
        required: [true, "falta password"],
        min: [5, "password demaciado corta"],
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{2}-\d{2}-\d{4}-\d{4}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    publications: {
        type: ["Publication"],
        ref: "Publication",
    },
    shopping: {
        type: ["Shopping"],
        ref: "Shopping",
    },
    sales: {
        type: ["Sales"],
        ref: "Sales",
    },
    active: {
        type: Boolean,
        default: true,
    },
    photo: {
        type: String,
    },
    //cambios en modelo
    dni: {
        type: String,
    },
    userName: {
        type: String,
    },
    address: {
        type: ["Address"],
        ref: "Address",
    },
    type: {
        type: String,
        required: [true, "necesita un type"],
        enum: ["normal", "admin", "employee"]
    },
    denunciations: {
        type: ["Denunciation"],
        ref: "Denunciation"
    }
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
