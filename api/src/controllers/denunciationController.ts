import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import DenunciationSchema, { Denunciation } from "../models/denunciation";
import PublicationSchema, { Publication } from "../models/publication";
import UserSchema, { User } from "../models/user";



export default class DenunciationController {

    static async set(req: Request, res: Response): Promise<Response> {
        try {
            const { publicationId, authorId, message } = req.body.denunciation;
            const denunciation: Denunciation = new DenunciationSchema({ author: authorId, publication: publicationId, message: message });
            await denunciation.save();

            return res.sendStatus(200);


        } catch (e) {
            console.log(e);
            return res.sendStatus(404);
        }
    }

    static async get(req: Request, res: Response): Promise<Response> {
        try {
            const denunciations: Denunciation[] = await DenunciationSchema.find()
            const response: any[] = []
            for (let i = 0; i < denunciations.length; i++) {
                const publication = await PublicationSchema.findById(denunciations[i].publication[0])
                response.push({
                    publication: publication,
                    author: await UserSchema.findById(denunciations[i].author[0]),
                    denunciation: denunciations[i],
                    infractor: (await UserSchema.findById(publication?.author))
                })
            }
            console.log(response)
            return res.json(response);

        } catch (error) {
            console.log(error);
            return res.sendStatus(404);
        }
    }

    static async delete(req: Request, res: Response): Promise<Response> {

        try {
            const { id } = req.params;
            await DenunciationSchema.findByIdAndDelete(id)
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.sendStatus(404);
        }
    }
    static async put(req: Request, res: Response): Promise<Response> {

        try {
            const { denunciationId } = req.body;
            console.log(denunciationId)
            const denunciation = await DenunciationSchema.findById(denunciationId)
            if (denunciation) {
                const publication = await PublicationSchema.findById(denunciation?.publication)
                const infractor = await UserSchema.findById(publication?.author)
                denunciation.state = true
                if (infractor && denunciation && publication) {
                    console.log("asdasd")

                    infractor.denunciations.push(denunciation)
                    await infractor.save();
                }
                await denunciation.save();

                return res.sendStatus(200);
            } else {
                return res.sendStatus(404)
            }


        } catch (e) {
            console.log(e);
            return res.sendStatus(404);
        }
    }
}
