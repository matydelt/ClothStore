import { Request, Response } from "express"
import PublicationSchema, {Publication} from "../models/publication";
import ShoppingSchema, {Shopping} from "../models/shopping";
import UserSchema from "../models/user";
import CarritoSchema from "../models/carrito";
import mercadoPago from 'mercadopago'
import dotenv from "dotenv";
import SalesSchema, { Sales } from "../models/sales";
import axios from "axios";

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
                if(descript){
                    orderMap.push(
                        {
                            id: order.publications[i].publication,
                            category_id: order.userId,
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
                notification_url: "https://hookb.in/Px0gpPOPE7hpKPrrKWP9",
                back_urls: { failure: '', pending: '', success: 'http://localhost:3000/' }
            }
            const response = await mercadoPago.preferences.create(preference)
            
            res.json(response.body.init_point)

        } catch (error) {
            console.log(error)
        }

    }
    static async postMP(req: Request, res: Response) {
        const MPInfo = req.body;
        try {
            const mpApi = (
                await axios.get(
                    `https://api.mercadopago.com/v1/payments/${MPInfo.data.id}?access_token=${process.env.MERCADOPAGO_API_PROD_ACCESS_TOKEN}`
                    )
                ).data;
            if (mpApi){
                const userCompra = await UserSchema.findById(mpApi.additional_info.items[0].category_id);
                if(userCompra ){
                    console.log(userCompra)
                    const userCarrito = await CarritoSchema.findOne({userId :mpApi.additional_info.items[0].category_id});
                    if(userCarrito){
                    console.log(userCarrito)
                    const compra : Shopping = new ShoppingSchema({
                        publications: userCarrito.publications,
                        amount: mpApi.transaction_amount,
                        userId: mpApi.additional_info.items[0].id,
                        date: mpApi.date_created,
                        state: true,
                        status: mpApi.status,
                        status_detail: mpApi.status_detail,
                    });
                    await compra.save();
                    userCompra.shopping.push(compra);
                    await userCompra?.save();
    
                    const obj: {[k: string]: any} = {};
                    obj["users"] = []
                    if(userCarrito.publications){
                        for(let i :number = 0; i< userCarrito.publications.length; i++){
                            const publi = await PublicationSchema.findById(userCarrito.publications[i].publication)
                            if(publi){
                                const us = await UserSchema.findById(publi.author)
                                if(us){
                                    publi.stock -= userCarrito.publications[i].quantity
                                    publi.markModified('stock')
                                    await publi.save();
                    
                                    for(let j :number = 0; j< us.publications.length; j++){
                                        if(us.publications[j].order==publi.order){
                                            us.publications[j].stock -= userCarrito.publications[i].quantity
                                        }
                                    }
                                    us.markModified('publications')
                                    await us.save();

                                    if (!(Object.keys(obj).includes(us.email as string))) {
                                        obj[`${us.email}`] = [userCarrito.publications[i]]
                                        obj.users.push(us.email)
                                        continue;
                                    }
                                    obj[`${us.email}`].push(userCarrito?.publications[i])
                                }
                            }
                        }
                        for(let i :number = 0; i< obj.users.length; i++){
                            const userVenta = await UserSchema.findOne({email: obj.users[i]});
                            if (userVenta){
                                let compras:number = 0
                                let comprar = 0
                                comprar= obj[`${obj.users[i]}`].forEach( (c:any) => {
                                    compras = compras + (c.price*c.quantity)
                                })
                        
                                const venta : Sales = new SalesSchema({
                                    publications: obj[`${obj.users[i]}`],
                                    amount: compras,
                                    userId: userVenta._id,
                                    date: mpApi.date_created,
                                    state: true,
                                    status: mpApi.status,
                                    status_detail: mpApi.status_detail,
                                    codigo: `${mpApi.id}`
                                });
                                
                                await venta.save();
                                userVenta.sales.push(venta);
                                await userVenta.save();
                            }
                        }

                        userCarrito.publications = [];
                        userCarrito.markModified('publications')
                        await userCarrito.save();
                    }
                    res.sendStatus(200);
                }
                }
            }
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
}