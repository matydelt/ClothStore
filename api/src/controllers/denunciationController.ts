import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import DenunciationSchema, { Denunciation } from "../models/denunciation";
import PublicationSchema, { Publication } from "../models/publication";
import UserSchema, { User } from "../models/user";

export default class DenunciationController {

    static async set(req: Request, res: Response): Promise<Response> {
        try {
            const { publicationId, authorId, message } = req.body;
            const denunciation: Denunciation = new DenunciationSchema({ author: authorId, publication: publicationId, message });
            await denunciation.save();

            return res.sendStatus(200);

        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }

    static async get(req: Request, res: Response): Promise<Response> {
        try {
            const denunciations: Denunciation[] = await DenunciationSchema.find()

            return res.json(denunciations);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }

    static async delete(req: Request, res: Response): Promise<Response> {

        try {
            const { id } = req.params;
            await DenunciationSchema.findByIdAndDelete(id)
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async put(req: Request, res: Response): Promise<Response> {

        try {
            const { denunciationId, flag } = req.body;

            const denunciation = await DenunciationSchema.findById(denunciationId)
            if (denunciation) {

                const publication = await PublicationSchema.findById(denunciation?.publication)
                const infractor = await UserSchema.findById(publication?.author)

                if (flag && infractor && denunciation) {

                    infractor.denunciations.push(denunciation)
                }
                denunciation.state = true
                await denunciation.save();

                return res.sendStatus(200);
            } else {
                return res.sendStatus(404)
            }


        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
}
