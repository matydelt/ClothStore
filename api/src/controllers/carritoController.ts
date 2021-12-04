import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import carritoSchema, { Carrito } from '../models/carrito';
import PublicationSchema from '../models/publication';
import { FilterQuery } from "mongoose";



export default class CarritoController {
    static async postCarrito(req: Request, res: Response) {
        try {

            const carrito = req.body
            const { _id } = req.params

            const carritoMap = carrito.map((c: any) => ({
                publication: c.id,
                price: c.price,
                quantity: c.amount,
                title: c.title,
                image: c.image
            }))

            const carritoBuscado: Carrito | null = await carritoSchema.findOne({ userId: _id } as FilterQuery<Carrito>)

            if (carritoBuscado) {
                carritoBuscado.publications = carritoMap
                carritoBuscado.markModified('publications')
                await carritoBuscado.save()
            }
            console.log(_id, 'id post carrito')
        } catch (error) {
            console.log(error)
        }

    }

    static async getCarrito(req: Request, res: Response) {
        try {
            const { email } = req.params;

            const user = await UserSchema.findOne({ email })

            const carritoBuscado: Carrito | null = await carritoSchema.findOne({ userId: user?._id })

            res.json(carritoBuscado)
        } catch (error) {
            console.error(error);
        }
    }
    static async putCarrito(req: Request, res: Response) {
        try {

            const { id, email } = req.params

            const user = await UserSchema.findOne({ email })

            const carritoBuscado: any = await carritoSchema.findOne({ userId: user?._id })

            // console.log(carritoBuscado)

            // const carritoMap = carritoBuscado?.publications.map((p: any) => {

            //     if (p.publication.equals(id)) {
            //         p.quantity++
            //     } else {
            //         let newPublication: object;
            //         PublicationSchema.findById(id).then(findPublic => {
            //             if (findPublic) {
            //                 newPublication = {
            //                     quantity: 1,
            //                     title: findPublic?.name,
            //                     image: findPublic?.images[0].url,
            //                     price: findPublic.price
            //                 }
            //                 console.log(newPublication)
            //             }
            //         })
            //     }
            //     return p
            // })

            // console.log(carritoMap)

            carritoBuscado?.publications?.forEach((p: any) => {
                if (p?.publication.equals(id)) {
                    p.quantity++
                } else {
                    PublicationSchema.findById(id).then(findPublic => {
                        if (findPublic) {
                            let newPublication = {
                                quantity: 1,
                                title: findPublic?.name,
                                image: findPublic?.images[0].url,
                                price: findPublic.price
                            }
                            console.log(newPublication)
                            carritoBuscado?.publications?.push(newPublication);
                        }
                    })
                }
            })

            // carritoBuscado.publications = carritoMap;
            carritoBuscado.markModified('publications')
            await carritoBuscado.save()
            console.log(carritoBuscado.publications, 'publication******')

            res.sendStatus(200)
        } catch (error) {
            console.error(error);
        }
    }
}