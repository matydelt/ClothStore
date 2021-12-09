import { Request, Response } from "express"
import PublicationSchema from "../models/publication";
import ShoppingSchema, {Shopping} from "../models/shopping";
import UserSchema from "../models/user";
import carritoSchema from "../models/carrito";
import mercadoPago from 'mercadopago'
import dotenv from "dotenv";

dotenv.config()

const { MERCADOPAGO_API_PROD_ACCESS_TOKEN } = process.env

declare namespace process.env {
    const MERCADOPAGO_API_PROD_ACCESS_TOKEN: string;
}


mercadoPago.configure({
    access_token: MERCADOPAGO_API_PROD_ACCESS_TOKEN
})

export default class Checkout {
    static async postCheckout(req: Request, res: Response) {

        const order = req.body;

        let publicaciones: Array<any> = await PublicationSchema.find()
        let autores: Array<any> = await UserSchema.find()
        try {

            const orderMap = order.publications.map( (c:any) => {
                const descript = publicaciones.map(e=>{if(e._id ==c.publication)return e.detail}).filter(e => e!=null).toString()
                return {
                    id: c.publication,
                    description: descript,
                    title: c.title,
                    unit_price: c.price,
                    quantity: c.quantity
                }
            })
            const preference = {
                items: orderMap,
                marketplace: 'Cloth Store',
                additional_info: order._id,
                statement_descriptor: "Clothstore",
                back_urls: { failure: '', pending: '', success: 'http://localhost:3000/' }
            }
            const response = await mercadoPago.preferences.create(preference)

            console.log(response.body.date_created)

            let compras:number = 0
            let comprar = 0
            comprar= order.publications.forEach( (c:any) => {
                compras = compras + (c.price*c.quantity)
            })
            console.log("----------------compras----------",order.publications)


            const compra : Shopping = new ShoppingSchema({
                publications: order.publications,
                amount: compras,
                date: response.body.date_created,
                state: true,
                status: "pending",
                status_detail: "pending accreditation",

            });
            await compra.save();//userId
            const user = await UserSchema.findById(order.userId);
            // await PublicationSchema.findById(id).updateOne({ stock: stock });
            user?.shopping.push(compra);
            await user?.save();

            const carrito = await carritoSchema.findById(order._id)
            if(carrito){
                carrito.publications = [];
                carrito.markModified('publications')
                await carrito.save();
            }

            res.json(response.body.init_point)


        } catch (error) {
            console.log(error)
        }

    }
}