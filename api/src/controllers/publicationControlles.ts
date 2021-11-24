import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import PublicationSchema, { Publication } from "../models/publication";

export default class PublicationController {

    static async setPublication(req: Request, res: Response) {
        try {
            const { name, images, id, stock, mark, detail, price, categorie, gender } = req.body
            const publication: Publication = new PublicationSchema({ name, images, stock, mark, detail, price, categorie, gender, author: id });
            await publication.save();
            const user = await UserSchema.findById(id)

            user?.publications.push(publication)
            await user?.save();
            res.sendStatus(200);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }

    }
    static async getPublications(req: Request, res: Response): Promise<void> {
        try {
            const publications: Publication[] = await PublicationSchema.find()
            res.json(publications);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    static async putPublication(req: Request, res: Response) {
        try {
            // const { name, images } = req.body
            // const publication: Publication = new PublicationSchema({ name, images });
            // await publication.save();
            res.sendStatus(200);
        } catch (e) {
            // console.log(e)
            res.sendStatus(500)
        }
    }

    static async deletePublications(req: Request, res: Response): Promise<void>{
        try {
            const{_id}= req.params
            await PublicationSchema.deleteOne({_id})
            res.json("Elemento Borrado")
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }
    static async putStock(req: Request, res: Response): Promise<void> {
        try {
            const { id, stock } = req.body
            await PublicationSchema.findById(id).updateOne({ stock: stock })
            res.send("stock modificado");
        } catch (e) {
            console.log(e)
        }
    }
}