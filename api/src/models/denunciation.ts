import mongoose, { Schema, model } from "mongoose";
import { Publication } from "./publication";
import { User } from "./user";

export interface Denunciation extends mongoose.Document {
    message: string;
    state: boolean;
    author: [User];
    publication: [Publication];
}

const DenunciationSchema = new Schema({
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

export default model<Denunciation>("Denunciation", DenunciationSchema);
