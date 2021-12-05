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

            const carritoBuscado: Carrito | null = await carritoSchema.findOne({ userId: _id } as FilterQuery<Carrito>)

            if (carritoBuscado) {
                let length = carritoBuscado?.publications?.length;

                if (length === 0) {
                    carrito.forEach((p: any) => {
                        carritoBuscado.publications.push({
                            publication: p.id,
                            price: p.price,
                            quantity: p.amount,
                            title: p.title,
                            image: p.image
                        })
                    })
                }

                carrito.forEach((c: any) => {

                    for (let i = 0; i < length; i++) {
                        if (carritoBuscado?.publications[i]?.publication?.equals(c.id)) {
                            carritoBuscado.publications[i].quantity += parseInt(c.amount);
                        } else {
                            if (!carritoBuscado.publications.find(p => p.publication.equals(c.id)))
                                carritoBuscado?.publications?.push({
                                    publication: c.id,
                                    price: c.price,
                                    quantity: c.amount,
                                    title: c.title,
                                    image: c.image
                                })
                            // break;
                        }

                    }



                })

                // const carritoMap = carrito.map((c: any) => {

                //     // if (carritoBuscado) {

                //         // for (let i = 0; i < carritoBuscado?.publications.length; i++) {
                //         //     if (carritoBuscado?.publications[i]?.publication?.equals(c.id)) {
                //         //         carritoBuscado.publications[i].quantity += c.amount;
                //         //         return carritoBuscado.publications[i];
                //         //     } else {
                //         //     }
                //                 return {
                //                     publication: c.id,
                //                     price: c.price,
                //                     quantity: c.amount,
                //                     title: c.title,
                //                     image: c.image
                //                 }

                //         // }

                //     // }


                // })

                // carritoBuscado.publications = carritoMap
                carritoBuscado.markModified('publications')
                await carritoBuscado.save()

                res.sendStatus(200);
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
        let nuevo: boolean = false;
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

            const publicationSearched = carritoBuscado?.publications?.find((p: any) => {
                if (p?.publication.equals(id)) {
                    console.log('entró en if')
                    p.quantity++
                    nuevo = false;
                    return p;
                } else {
                    console.log('entró en else')
                    nuevo = true;
                }

            })

            if (!publicationSearched) {
                const findPublic = await PublicationSchema.findById(id)
                if (findPublic) {

                    carritoBuscado?.publications?.push({
                        publication: findPublic._id,
                        quantity: 1,
                        title: findPublic?.name,
                        image: findPublic?.images[0].url,
                        price: findPublic.price
                    });
                    console.log(carritoBuscado?.publications, '-----------------------------------------------------------asdsdsadsa')
                }

            }

            // carritoBuscado.publications = carritoMap;
            carritoBuscado.markModified('publications')
            await carritoBuscado.save()
            console.log(carritoBuscado.publications, 'publication******')

            res.status(200).json(carritoBuscado);
        } catch (error) {
            console.error(error);
        }
    }
    static async putCarritoRemove(req: Request, res: Response) {
        let nuevo: boolean = false;
        try {

            const { id, email } = req.params

            const user = await UserSchema.findOne({ email })

            const carritoBuscado: any = await carritoSchema.findOne({ userId: user?._id })

            const publicationSearched = carritoBuscado?.publications?.find((p: any) => {
                if (p?.publication.equals(id)) {
                    if (p.quantity < 2) {
                        carritoBuscado.publications = carritoBuscado?.publications.filter((publicationDelete: any) => publicationDelete.publication !== p.publication);
                        console.log(p, 'publicacion borrada')
                        return;
                    };
                    p.quantity--
                    nuevo = false;
                    return p;
                }
            })



            carritoBuscado.markModified('publications')
            await carritoBuscado.save()
            console.log('publication END')


            res.status(200).json(carritoBuscado);
        } catch (error) {
            console.error(error);
        }
    }
}