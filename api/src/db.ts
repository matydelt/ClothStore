import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const conn = mongoose.connect('mongodb://localhost:27017/market-place')
export default conn