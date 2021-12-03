import mongoose, { Schema, model } from "mongoose";

export interface Address extends mongoose.Document {
  street: string;
  suite: string;
  city: string;
  country: string;
  cp: string;
}

const AddressSchema = new Schema({
  street: {
    type: String,
    required: [true, "falta calle"],
  },
  suite: {
    type: String,
    required: [true, "falta numero"],
  },
  city: {
    type: String,
    required: [true, "falta ciudad"],
  },
  country: {
    type: String,
    required: [true, "falta País"],
  },
  cp: {
    type: String,
    required: [true, "falta Codigo postal"],
  },
});

export default model<Address>("Address", AddressSchema);
