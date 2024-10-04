import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const COnnectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Mongoose is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        })

        isConnected = true;

        console.log("MongoDB is Connected")
    } catch (error) {
        console.log(error);
    }
}
