import mongoose, { Schema, model } from "mongoose";

export interface QAndA extends mongoose.Document {
  message: string;
  author: Schema.Types.ObjectId;
  publication: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  isQuestion: boolean;
}

const QAndASchema = new Schema({
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
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'QAndA',
    require: [true, "necesita id de la respuesta"]
  },
  isQuestion: {
    type: Boolean
  }
}, {  timestamps: true });

export default model<QAndA>("QAndA", QAndASchema);
