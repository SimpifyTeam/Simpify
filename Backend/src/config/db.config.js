import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("connection host : ",dbInstance.connection.host);
    } catch (error) {
        console.log("error while connecting db : ",error);
        process.exit(1);
    }
}

export default connectDB;