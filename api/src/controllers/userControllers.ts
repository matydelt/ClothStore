import { Request, Response } from "express";
import UserSchema, { User } from "../models/user";

export default class UserController {
  static async setUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, phone, email, password, photo } = req.body;
      const user: User = new UserSchema({
        phone,
        email,
        password,
        name: { firstName, lastName },
        photo,
      });
      await user.save();
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
  static async getUser(req: Request, res: Response) {
    try {
      const { email, password } = req.query;
      const user = await UserSchema.findOne({ email: `${email}` });
      if (user && user.password === password) res.json(user);
      else res.send("usuario o contraseña erronea");
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async banUser(req: Request, res: Response) {
    try {
      const { id } = req.body;
      await UserSchema.updateOne({ _id: id }, { $set: { active: false } });
      res.json("El usuario se marco como inactivo");
    } catch (error) {
      console.log("error en banUser");
      res.sendStatus(500);
    }
  }

  static async getOneUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserSchema.findOne({ _id: id });
      res.json(user);
    } catch (error) {
      console.log("error en get one user");
      res.sendStatus(500);
    }
  }
  static async updateUser(req: Request, res: Response) {
    try {
      const {
        id,
        phone,
        firstName,
        lastName,
        dni,
        street,
        cp,
        city,
        country,
        suite,
      } = req.body;
      const user = await UserSchema.updateOne(
        { _id: id },
        {
          $set: {
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            dni: dni,
            domicilio: {
              street: street,
              suite: suite,
              city: city,
              country: country,
              cp: cp,
            },
          },
        }
      );
      res.json("usuario modificado");
    } catch (error) {
      console.log("error en updateUser");
      res.sendStatus(500);
    }
  }
}
