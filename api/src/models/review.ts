import mongoose, { Schema, model } from "mongoose";

export interface Review extends mongoose.Document {
  message: string;
  score: number;
  title: number;
  author: Schema.Types.ObjectId;
  publication: Schema.Types.ObjectId;
}

const ReviewSchema = new Schema({
  title: {
      type: String,
      required: [true, "falta title"],
    },
  message: {
      type: String,
      required: [true, "falta message"],
    },
    score: {
      type: Number,
      required: [true, "falta score"],
      min: [1, 'No puede ser menor a 1'],
      max: [5, 'No puede ser mayor a 5']
    },
    author: {
        type: Schema.Types.ObjectId,
        require: [true, "necesita id de author"]
    },
    publication: {
        type: Schema.Types.ObjectId,
        require: [true, "necesita id de publicación"]
    },
});

export default model<Review>("Review", ReviewSchema);
