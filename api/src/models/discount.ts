import mongoose, { Schema, model } from "mongoose";

export interface Discount extends mongoose.Document {
  active: boolean,
  percentage: number,
  author: Schema.Types.ObjectId,
  publication: Schema.Types.ObjectId,
  expireAt: any,
  amount: number,
}

const DiscountSchema = new Schema({
  active: {
    type: Boolean,
    default: false
  },
  percentage: {
    type: Number,
    // default: 0,
    min: 1,
    max: 100
  },
  author: {
    type: Schema.Types.ObjectId,
    require: [true, "necesita id de author"]
  },
  publication: {
    type: Schema.Types.ObjectId,
    require: [true, "necesita id de publicación"]
  },
  expireAt: {
    type: Date,
    // default:  Date.now,
    // expires: '0s'
  },
  amount: {
    type: Number
  }
}, { timestamps: true });

export default model<Discount>("Discount", DiscountSchema);
