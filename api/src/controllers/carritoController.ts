import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import carritoSchema, { Carrito } from '../models/carrito'
import { FilterQuery } from "mongoose";



export default class CarritoController {
    static async postCarrito(req: Request, res: Response) {
        try {

            const carrito = req.body
            const { _id } = req.params

            const carritoMap = carrito.map((c:any) => ({
                publication: c.id,
                price: c.price,
                quantity: c.amount,
                title: c.title
            }))

            const carritoBuscado: Carrito | null = await carritoSchema.findOne({ userId: _id } as FilterQuery<Carrito>) 
            
            if (carritoBuscado) {
                carritoBuscado.publications = carritoMap
                carritoBuscado.markModified('publications')
                await carritoBuscado.save()
            }
            console.log(carritoBuscado, 'carrito buscado', carrito, 'carrito Localstorage')
        } catch (error) {
            console.log(error)
        }

    }

    static async getCarrito(req: Request, res: Response) {
        try {
            const { email } = req.params;

            const user = await UserSchema.findOne({email})

            const carritoBuscado: Carrito | null = await carritoSchema.findOne({ userId: user?._id })

            console.log(carritoBuscado)


        } catch (error) {
            console.error(error);
        }
    }
}