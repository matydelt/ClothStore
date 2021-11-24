import Mongoose, { model, Schema } from "mongoose";

export interface Shopping extends Mongoose.Document {
    publications: "Product";
    price: number;
    amount: number;
}

const ShoppingSchema = new Schema({
    publications: {
        type: [Schema.Types.ObjectId],
        ref: "Product"
    },
    amount: {
        type: Number,
        required: [true, "necesita una cantidad"]
    },
    price: {
        type: Number,
        required: [true, "necesita precio"]
    }

})

export default model<Shopping>("Shopping", ShoppingSchema)