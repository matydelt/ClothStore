import mongoose, { Schema, model, Types } from 'mongoose'

export interface Carrito extends mongoose.Document {
    title: string;
    quantity: number;
    price: number;
    publications: {publication: Types.ObjectId, price: number, quantity: number, image: string, title: string}[];
    image: string;
    userId: Schema.Types.ObjectId;
}

const carritoSchema = new Schema({
    publications: [
        {
            publication: {
                type: Types.ObjectId,
                ref: "Publication",
            },
            price: Number,
            quantity: Number,
            image: String,
            title: {
                type: String,
                trim: true
            }
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default model<Carrito>('Carrito', carritoSchema);



