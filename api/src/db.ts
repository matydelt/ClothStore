import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const conn = mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
// const conn = mongoose.connect(`${process.env.DB_ENLACE}`)
export default conn
