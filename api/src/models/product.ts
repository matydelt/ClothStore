import mongoose, { Schema, model } from "mongoose";

export interface Product extends mongoose.Document {
    name: object;
    email: string;
    password: string;
}

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "falta product name"]
    },
    img: {
        type: [],

    }

})

export default model<Product>("Product", ProductSchema);