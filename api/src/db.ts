import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const conn = mongoose.connect(`${process.env.DB_ENLACE}`)
export default conn
