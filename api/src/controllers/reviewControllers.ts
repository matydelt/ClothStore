import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import ReviewSchema, { Review } from "../models/review";
import PublicationSchema, { Publication } from "../models/publication";

export default class ReviewControlllers {

    static async setReview(req: Request, res: Response): Promise<Response> {
        const { authorId, publicationId, title, message, score } = req.body;

        console.log(authorId, publicationId, title, message, score)

        try {
            const reviewExists: Review | null = await ReviewSchema.findOne({ author: authorId, publication: publicationId }).exec();
            //1 TODO: Validar que el producto haya sido comprado por el autor de la Review
            // ...

            //2 Limitar el número de reviews a 1
            if (reviewExists) {
                reviewExists.message = message;
                reviewExists.score = score;
                reviewExists.title = title;
                await reviewExists.save();
                return res.sendStatus(200);
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

    static async getReviews(req: Request, res: Response): Promise<Response | undefined> {
        const { publicationId } = req.params;
        const { filterCriteria, from = 1 } = req.query;

        let scoreAverage = 0;
        let reviews: Review[] = [];

        let fromParsed: number = Number(from);

        let limit = 5;
        let offset = 0 + (fromParsed - 1) * limit;

        if (offset < 0) offset = 0;

        try {
            if (filterCriteria === 'all') {
                reviews = await ReviewSchema.find({ publication: publicationId } as FilterQuery<Review>).skip(offset).limit(limit).exec();
            }
            if (filterCriteria === 'positive') {
                reviews = await ReviewSchema.find({ publication: publicationId, score: { $gt: 2 } } as FilterQuery<Review>).skip(offset).limit(limit).exec();
            }
            if (filterCriteria === 'negative') {
                reviews = await ReviewSchema.find({ publication: publicationId, score: { $lt: 3 } } as FilterQuery<Review>).skip(offset).limit(limit).exec();
            }


            let reviewsScores: Review[] = await ReviewSchema.find({ publication: publicationId } as FilterQuery<Review>).exec();
            const sum = reviewsScores.reduce((partial_sum, r) => partial_sum + r.score, 0);
            scoreAverage = Math.round(sum / reviewsScores.length);

            console.log(reviews)

            return res.json({ reviews, scoreAverage, totalScores: reviewsScores.length });

        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }

    static async getReview(req: Request, res: Response): Promise<Response | undefined> {
        const { publicationId, authorId } = req.params;

        try {
            const reviewExists = await ReviewSchema.findOne({ publication: publicationId, author: authorId } as FilterQuery<Review>);

            return res.json(reviewExists);

        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }

}
