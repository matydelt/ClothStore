import mongoose, { Schema, model } from "mongoose";
import { Publication } from "./publication";
import { Shopping } from "./shopping";
import { Address } from "./address";

export interface User extends mongoose.Document {
  name: object;
  email: string;
  password: string;
  phone: string;
  publications: [Publication];
  shopping: [Shopping];
  photo: string;
  dni: string;
  userName: string;
  address: [Address];
}

const UserSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "falta first name"],
    },
    lastName: {
      type: String,
      required: [true, "falta first name"],
    },
  },
  email: {
    type: String,
    required: [true, "falta email"],
    _id: [true, "violacion de unicidad"],
  },
  password: {
    type: String,
    required: [true, "falta password"],
    min: [5, "password demaciado corta"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /\d{2}-\d{2}-\d{4}-\d{4}/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  publications: {
    type: ["Publication"],
    ref: "Publication",
  },
  shopping: {
    type: ["Shopping"],
    ref: "Shopping",
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
  },
  //cambios en modelo
  dni: {
    type: String,
  },
  userName: {
    type: String,
  },
  domicilio: {
    type: ["Address"],
    ref: "Address",
  },
});

export default model<User>("User", UserSchema);
