import mongoose, { Schema, model } from "mongoose";

export interface Publication extends mongoose.Document {
    name: object;
    images: [];

}

const PublicationSchema = new Schema({
    name: {
        type: String,
        required: [true, "falta product name"]
    },
    images: {
        type: [],
    },

})

export default model<Publication>("Publication", PublicationSchema);