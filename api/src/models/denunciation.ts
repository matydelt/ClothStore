import mongoose, { Schema, model } from "mongoose";

export interface Denunciation extends mongoose.Document {
    message: string;
    state: boolean;
    author: Schema.Types.ObjectId;
    publication: Schema.Types.ObjectId;
}

const DenunciationSchema = new Schema({
    message: {
        type: String,
        required: [true, "falta message"],
    },
    author: {
        type: Schema.Types.ObjectId,
        require: [true, "necesita id de author"]
    },
    publication: {
        type: Schema.Types.ObjectId,
        require: [true, "necesita id de publicación"]
    },
    state: {
        type: Boolean,
        default: false
    }
});

export default model<Denunciation>("Denunciation", DenunciationSchema);
