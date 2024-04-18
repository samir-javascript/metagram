

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export const connectToDb = async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error("MongoDB URL is missing in environment variables");
    }

    if (isConnected) {
        console.log('MongoDB is already connected');
        return; // No need to proceed if already connected
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "appGramista",
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useUnifiedTopology: true
        });

        isConnected = true;
        console.log('MongoDB has been connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw error; // Rethrow the error for upper layers to handle
    }
};
