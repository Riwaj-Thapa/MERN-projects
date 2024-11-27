import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_STRING_URL);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDb;
  