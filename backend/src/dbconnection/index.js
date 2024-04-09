import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`connect mongodb ${connectionInstance.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB