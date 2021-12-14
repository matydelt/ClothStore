import { Request, Response } from "express"
import PublicationSchema, { Publication } from "../models/publication";
import ShoppingSchema, { Shopping } from "../models/shopping";
import UserSchema from "../models/user";
import carritoSchema from "../models/carrito";
import mercadoPago from 'mercadopago'
import dotenv from "dotenv";
import SalesSchema, { Sales } from "../models/sales";

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

        try {

            const orderMap: Array<any> = [];
            for (let i = 0; i < order.publications.length; i++) {
                const descript = await PublicationSchema.findById(order.publications[i].publication)
                if (descript) {
                    orderMap.push(
                        {
                            id: order.publications[i].publication,
                            description: descript.detail,
                            title: order.publications[i].title,
                            unit_price: order.publications[i].price,
                            quantity: order.publications[i].quantity
                        }
                    )
                }
            }
            const preference = {
                items: orderMap,
                marketplace: 'Cloth Store',
                additional_info: order._id,
                statement_descriptor: "Clothstore",
                back_urls: { failure: '', pending: '', success: 'https://cloth-store-henry.herokuapp.com' }
            }
            const response = await mercadoPago.preferences.create(preference)

            let compras: number = 0
            let comprar = 0
            comprar = order.publications.forEach((c: any) => {
                compras = compras + (c.price * c.quantity)
            })

            const compra: Shopping = new ShoppingSchema({
                publications: order.publications,
                amount: compras,
                userId: order.userId,
                date: response.body.date_created,
                state: true,
                status: "pending",
                status_detail: "pending accreditation",
                link: `${response.body.init_point}`
            });
            await compra.save();
            const userCompra = await UserSchema.findById(order.userId);
            userCompra?.shopping.push(compra);
            await userCompra?.save();

            const obj: { [k: string]: any } = {};
            obj["users"] = []
            for (let i: number = 0; i < order.publications.length; i++) {
                const publi = await PublicationSchema.findById(order.publications[i].publication)
                if (publi) {
                    const us = await UserSchema.findById(publi.author)
                    if (us) {
                        publi.stock -= order.publications[i].quantity
                        publi.markModified('stock')
                        await publi.save();

                        for (let j: number = 0; j < us.publications.length; j++) {
                            if (us.publications[j].order == publi.order) {
                                us.publications[j].stock -= order.publications[i].quantity
                            }
                        }
                        us.markModified('publications')
                        await us.save();

                        if (!(Object.keys(obj).includes(us.email as string))) {
                            obj[`${us.email}`] = [order.publications[i]]
                            obj.users.push(us.email)
                            continue;
                        }
                        obj[`${us.email}`].push(order.publications[i])
                    }
                }
            }

            for (let i: number = 0; i < obj.users.length; i++) {
                const userVenta = await UserSchema.findOne({ email: obj.users[i] });
                if (userVenta) {
                    compras = 0
                    comprar = 0
                    comprar = obj[`${obj.users[i]}`].forEach((c: any) => {
                        compras = compras + (c.price * c.quantity)
                    })

                    const venta: Sales = new SalesSchema({
                        publications: obj[`${obj.users[i]}`],
                        amount: compras,
                        userId: userVenta._id,
                        date: response.body.date_created,
                        state: true,
                        status: "pending",
                        status_detail: "pending accreditation",
                        codigo: ``
                    });
                    await venta.save();
                    userVenta.sales.push(venta);
                    await userVenta.save();
                }
            }


            const carrito = await carritoSchema.findById(order._id)
            if (carrito) {
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