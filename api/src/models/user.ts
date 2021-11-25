import mongoose, { Schema, model } from "mongoose";

export interface User extends mongoose.Document {
    name: object;
    email: string;
    password: string;
}

const UserSchema = new Schema({
    name: {
        fistName: {
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
            validator: function (v: string) {
                return /\d{2}-\d{2}-\d{4}-\d{4}/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid phone number!`
        },
    },
    publications: {
        type: [Schema.Types.ObjectId],
        ref: "Product"
    }

})

export default model<User>("User", UserSchema);