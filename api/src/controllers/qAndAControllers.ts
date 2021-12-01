import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import PublicationSchema, { Publication } from "../models/publication";
import QAndASchema, { QAndA } from "../models/qAndA";

export default class QAndAControllers {

    static async setQuestion(req: Request, res: Response): Promise<Response> {
        const { authorId, publicationId, message } = req.body;

        try {

            const question: QAndA = new QAndASchema({ author: authorId, publication: publicationId, message, isQuestion: true });

            await question.save();

            // const publication: Publication | null = await PublicationSchema.findById(publicationId);

            // publication?.qAndAs.push(question);
            // await publication?.save();

            return res.sendStatus(200);

        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }

    static async setAnswer(req: Request, res: Response): Promise<Response> {
        const { message, questionId, authorId } = req.body;

        try {
            const question: QAndA | null = await QAndASchema.findById(questionId);
            
            // Validar que el vendedor pueda responder
            const publication: Publication | null = await PublicationSchema.findOne({ _id: question?.publication.toString()});
            if(publication?.author.toString() !== authorId) return res.sendStatus(403);
        

            if (question) {

                const answer: QAndA = new QAndASchema({ author: authorId, publication: question?.publication, message });
                const savedAnswer = await answer?.save();

                question.answer = savedAnswer?._id

                await question?.save();
            }
            return res.sendStatus(200);
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }

    static async getQAndAs(req: Request, res: Response): Promise<Response> {
        const { publicationId } = req.params;

        try {
            const qandas: QAndA[] = await QAndASchema.find({ publication: publicationId, isQuestion: true } as FilterQuery<QAndA>).sort({ createdAt: -1 }).populate('answer').exec();

            return res.json(qandas);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }

}
