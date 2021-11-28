import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const conn = mongoose.connect(
  `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
);
export default conn;
