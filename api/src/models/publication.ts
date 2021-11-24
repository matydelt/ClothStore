import mongoose, { Schema, model } from "mongoose";

export interface Publication extends mongoose.Document {
    name: object;
    images: [];
    stock: number;
    mark: string;
    detail: string;
    price: number;

}

const PublicationSchema = new Schema({
    name: {
        type: String,
        required: [true, "falta product name"]
    },
    images: {
        type: [String],
    },
    stock: {
        type: Number,
        required: [true, "falta stock"]
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
    }


})

export default model<Publication>("Publication", PublicationSchema);