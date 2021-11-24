import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";

export default class UserController {

    static async setUser(req: Request, res: Response) {
        try {
            const { firstName, lastName, phone, email, password } = req.body
            const user: User = new UserSchema({ phone, email, password, name: { firstName, lastName } });
            await user.save();
            res.sendStatus(200);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }

    }
    static async getUser(req: Request, res: Response) {
        try {
            const { email, password } = req.query
            const user = await UserSchema.find().findOne({ _email: email })
            if (user && user.password === password)
                res.json(user);
            else res.send("usuario o contraseña erronea")
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}