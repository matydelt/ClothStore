import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";

export default class UserController {

    static async setUser(req: Request, res: Response) {
        try {
            const { title, author } = req.body
            const user: User = new UserSchema({ title: title, author: author });
            await user.save();
            res.sendStatus(200);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }

    }
    static async getUser(req: Request, res: Response) {
        try {
            const books: User[] = await UserSchema.find();
            res.json(books);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}