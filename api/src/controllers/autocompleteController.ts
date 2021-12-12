import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import carritoSchema, { Carrito } from '../models/carrito';
import PublicationSchema from '../models/publication';
import DiscountSchema from '../models/discount';
import { FilterQuery } from "mongoose";



export default class DiscountController {
    static async getAutocomplete(req: Request, res: Response) {
        const { text } = req.query;

        console.log(text)

        try {

            const searchedTexts = await PublicationSchema.find({ name: { $regex: '.*' + text + '.*', $options: 'i'  } }).select("_id, name").limit(8);;
          

            console.log(searchedTexts)
            
            return res.json(searchedTexts);
            
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }

    }

}