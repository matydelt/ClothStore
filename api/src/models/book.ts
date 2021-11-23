import mongoose, { Schema, model } from "mongoose";

export interface Book extends mongoose.Document {
    title: string;
    author: string;
}

const BookSchema = new Schema({
    title: {
        type: String,
        required: [true, "porque no hay titulo"]
    },
    author: {
        type: String,
        required: [true, "porque no hay autor"]
    },

})

export default model<Book>("Book", BookSchema);