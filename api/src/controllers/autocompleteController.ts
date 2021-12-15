import { Request, Response } from "express"
import PublicationSchema from '../models/publication';


export default class DiscountController {
    static async getAutocomplete(req: Request, res: Response) {
        const { text } = req.query;

        try {

            const searchedTexts = await PublicationSchema.find({ name: { $regex: '.*' + text + '.*', $options: 'i' } }).select("_id, name").limit(8);

            return res.json(searchedTexts);

        } catch (error) {
            console.log(error);
            return res.sendStatus(404);
        }

    }

}