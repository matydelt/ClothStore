import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const conn = mongoose.connect(`mongodb+srv://matydelt:matias133@clothstore.jqw1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
export default conn
