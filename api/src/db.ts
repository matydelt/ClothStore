import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const conn = mongoose.connect(`${process.env.DB_SERVER}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
export default conn