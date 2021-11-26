import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import PublicationSchema, { Publication } from "../models/publication";

export default class PublicationController {

    static async setPublication(req: Request, res: Response) {

        const { publicationId } = req.query;

        try {
            const { name, images, id, stock, mark, detail, price, categorie, gender } = req.body

            if (publicationId) {
                await PublicationSchema.findByIdAndUpdate(publicationId, { name, images, stock, mark, detail, price, categorie, gender }, {new: true});
            } else {
                const publication: Publication = new PublicationSchema({ name, images, stock, mark, detail, price, categorie, gender, author: id });
                await publication.save();
                const user = await UserSchema.findById(id)

                user?.publications.push(publication)
                await user?.save();
            }

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

    static async putStock(req: Request, res: Response): Promise<void> {
        try {
            const { id, stock } = req.body
            await PublicationSchema.findById(id).updateOne({ stock: stock })
            res.send("stock modificado");
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    static async getPublication(req: Request, res: Response): Promise<void> {
        try {
            const { publicationId } = req.query;

            const publication = await PublicationSchema.findById(publicationId);

            if (publication) {
                res.json(publication);
            } else {
                res.json({ msg: 'La publicación no existe' })
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    }
}