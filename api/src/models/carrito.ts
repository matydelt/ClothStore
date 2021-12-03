import mongoose, { Schema, model } from 'mongoose'

export interface Carrito extends mongoose.Document {
    title: string;
    quantity: number;
    price: number;
    publications: Schema.Types.ObjectId[];
    userId: Schema.Types.ObjectId;
}

const carritoSchema = new Schema({
    publications: [
        {
            publication: {
                type: Schema.Types.ObjectId,
                ref: "Publication",
            },
            price: Number,
            quantity: Number,
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



