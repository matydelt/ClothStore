import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import ReviewSchema, { Review } from "../models/review";
import PublicationSchema, { Publication } from "../models/publication";

export default class ReviewControlllers {

    static async setReview(req: Request, res: Response): Promise<Response> {
        const { authorId, publicationId, title, message, score } = req.body;
        
        try {
            const reviewExists: Review | null = await ReviewSchema.findOne({ author: authorId, publication: publicationId }).exec();
            //1 TODO: Validar que el producto haya sido comprado por el autor de la Review
            // ...

            //2 Limitar el número de reviews a 1
            if (reviewExists) {
                return res.status(400).json({ msg: 'El usuario ya hizo una reseña sobre el producto' });
            }
            
            const review: Review = new ReviewSchema({ author: authorId, publication: publicationId, title, message, score });

            await review.save();

            const publication: Publication | null = await PublicationSchema.findById(publicationId);

            publication?.reviews.push(review);
            await publication?.save();

            return res.sendStatus(200);

        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }

    static async getReviews(req: Request, res: Response): Promise<Response> {
        const { publicationId } = req.params;
        
        try {
            const reviews: Review[] = await ReviewSchema.find({ publication: publicationId } as FilterQuery<Review>).exec();
            
            return res.json(reviews);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }

}
