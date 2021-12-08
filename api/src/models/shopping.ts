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
    date: {
        type: String,
        required: [true, "necesita date"]
    },
    state: {
        type: Boolean,
        required: [true, "necesita un state"]
    },
    status:{
        type: String,
        required: [true, "necesita un status"]
    },
    status_detail:{
        type: String,
        required: [true, "necesita un status_detail"]
    }
})

export default model<Shopping>("Shopping", ShoppingSchema)