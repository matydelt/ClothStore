import { Request, Response } from "express"
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

let preference = {
    items: [
        {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1
        }
    ]
}

export default class Checkout {
    static async postCheckout(req: Request, res: Response) {

        try {

            const response = await mercadoPago.preferences.create(preference)

            console.log(response.body)

            res.send('checkout')


        } catch (error) {
            console.log(error)
        }

    }
}