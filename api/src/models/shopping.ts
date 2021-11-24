import Mongoose, { model, Schema } from "mongoose";

export interface Shopping extends Mongoose.Document {
    publications: "Product";
    price: number;
    amount: number;
    state: boolean;
}

const ShoppingSchema = new Schema({
    publications: {
        type: [Schema.Types.ObjectId],
        ref: "Product"
    },
    amount: {
        type: Number,
        required: [true, "necesita un amount"]
    },
    price: {
        type: Number,
        required: [true, "necesita price"]
    },
    state: {
        type: Boolean,
        required: [true, "necesita un state"]
    }

})

export default model<Shopping>("Shopping", ShoppingSchema)