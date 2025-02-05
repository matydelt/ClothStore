import { Request, Response } from "express";
import UserSchema, { User } from "../models/user";
import carritoSchema, { Carrito } from "../models/carrito";

export default class UserController {
  static async setUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, phone, email, password, photo } = req.body;
      const users = await UserSchema.find();
      if (users.length > 0) {
        const user: User = new UserSchema({
          phone,
          email,
          password,
          name: { firstName, lastName },
          photo,
          type: "normal",
        });
        const userSave = await user.save();

        const carrito: Carrito = new carritoSchema({
          publications: undefined,
          userId: userSave._id,
        });

        await carrito.save();
        res.sendStatus(200);
      } else {
        const user: User = new UserSchema({
          phone,
          email,
          password,
          name: { firstName, lastName },
          photo,
          type: "admin",
        });
        await user.save();
        res.sendStatus(200);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  }

  static async setUserGoogle(req: Request, res: Response) {
    try {
      const { firstName, lastName, phone, email, password, photo } = req.body;
      const users = await UserSchema.find();
      if (users.length > 0) {
        const usersGoo = await UserSchema.findOne({ email: email });
        if (!usersGoo) {
          const user: User = new UserSchema({
            phone,
            email,
            password,
            name: { firstName, lastName },
            photo,
            type: "normal",
          });
          const userSave = await user.save();

          const carrito: Carrito = new carritoSchema({
            publications: undefined,
            userId: userSave._id,
          });

          await carrito.save();
          res.json(user);
        } else {
          if (usersGoo && usersGoo.password === password) res.json(usersGoo);
          else res.send("usuario o contraseña erronea");
        }
      } else {
        const user: User = new UserSchema({
          phone,
          email,
          password,
          name: { firstName, lastName },
          photo,
          type: "admin",
        });
        await user.save();
        res.sendStatus(200);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const { email, password } = req.query;
      const user = await UserSchema.findOne({ email: email as string });
      if (user && user.password === password) res.json(user);
      else res.send("usuario o contraseña erronea");
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  }
  static async getUsers(req: Request, res: Response) {
    try {
      const user = await UserSchema.find();
      res.json(user);
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  }

  static async getUserName(req: Request, res: Response) {
    try {
      let users: Array<any>;
      users = await UserSchema.find();
      users = users.filter((e) => {
        return e.active === true;
      });
      users = users
        .map((e) => {
          if (e.publications.length > 0) return e.userName;
        })
        .filter((e) => e != undefined);
      console.log(users);
      res.json(users);
    } catch (e) {
      console.log(e);
      res.json([]);
    }
  }
  static async banUser(req: Request, res: Response) {
    try {
      const { id, flag } = req.body;
      if (flag) {
        await UserSchema.updateOne({ _id: id }, { $set: { active: true } });
        res.json("El usuario se marco como activo");
      } else {
        await UserSchema.updateOne({ _id: id }, { $set: { active: false } });
        res.json("El usuario se marco como inactivo");
      }
    } catch (error) {
      console.log("error en banUser");
      res.sendStatus(404);
    }
  }

  static async getOneUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(req.params);
      const user = await UserSchema.findOne({ _id: id });
      res.json(user);
    } catch (error) {
      console.log("error en get one user");
      res.sendStatus(404);
    }
  }
  static async putStateUser(req: Request, res: Response) {
    try {
      const { id, flag } = req.body;
      const user = await UserSchema.findOne({ _id: id });
      if (user) {
        if (flag) user.type = "employee";
        else user.type = "normal";
        await user?.save();
        return res.json(user);
      } else return res.sendStatus(404);
    } catch (error) {
      console.log("error");
    }
  }

  static async getOneUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await UserSchema.findOne({ email: email });
      res.json(user);
    } catch (error) {
      console.log("error en get one user");
      res.sendStatus(404);
    }
  }
  static async updateUser(req: Request, res: Response) {
    try {
      const { id, phone, firstName, lastName, dni, userName } = req.body;
      const user = await UserSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            phone: phone,
            name: { firstName: firstName, lastName: lastName },
            dni: dni,
            userName: userName,
          },
        }
      );
      console.log(user)
      res.json("usuario modificado");
    } catch (error) {
      console.log("error en updateUser");
      res.sendStatus(404);
    }
  }
  static async updateAddress(req: Request, res: Response) {
    try {
      const { id, street, cp, city, country, suite } = req.body;
      await UserSchema.updateOne(
        { _id: id },
        {
          $addToSet: {
            address: {
              street: street,
              suite: suite,
              city: city,
              country: country,
              cp: cp,
            },
          },
        }
      );
      res.json("Domicilio agregado correctamente");
    } catch (error) {
      console.log("error en updateaddres");
      res.sendStatus(404);
    }
  }
}
