import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import PublicationSchema, { Publication } from "../models/publication";
import UserSchema, { User } from "../models/user";
import QAndASchema, { QAndA } from "../models/qAndA";
const sendEMail = require('../email/email');

export default class QAndAControllers {

    static async setQuestion(req: Request, res: Response): Promise<Response> {
        const { authorId, publicationId, message } = req.body;

        try {

            const question: QAndA = new QAndASchema({ author: authorId, publication: publicationId, message, isQuestion: true });
            const publication = await PublicationSchema.findById(publicationId).populate('author');
            const seller = await UserSchema.findById(publication?.author);

            await question.save();

            sendEMail.send({
                publicationImage: publication?.images[0]?.url,
                publicationName: publication?.name,
                publicationPrice: publication?.price,
                email: seller?.email,
                mensaje: message,
                subject: "Pregunta recibida",
                htmlFile: "question.html",
              });

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

                const buyer = await UserSchema.findById(question?.author);

                console.log(buyer)

                sendEMail.send({
                    publicationImage: publication?.images[0]?.url,
                    publicationName: publication?.name,
                    publicationPrice: publication?.price,
                    email: buyer?.email,
                    mensaje: message,
                    subject: "Pregunta Respondida",
                    htmlFile: "answer.html",
                  });

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
