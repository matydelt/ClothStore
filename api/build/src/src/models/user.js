"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: [true, "falta first name"]
        },
        lastName: {
            type: String,
            required: [true, "falta first name"]
        }
    },
    email: {
        type: String,
        required: [true, "falta email"],
        _id: [true, "violacion de unicidad"]
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
            message: (props) => `${props.value} is not a valid phone number!`
        },
    },
    publications: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Product"
    }
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
