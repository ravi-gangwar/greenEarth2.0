import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected: number | undefined;
}

const connection: ConnectionObject = {
    isConnected: undefined,
};

async function connectDb(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to the database");
        return;
    }

    if (!process.env.DATABASE_URL) {
        console.error("Missing MongoDB connection string");
        return;
    }

    try {
        // Check if mongoose is already connected
        if (mongoose.connections[0].readyState === 1) {
            console.log("Mongoose already connected");
            connection.isConnected = 1;
            return;
        }

        const db = await mongoose.connect(process.env.DATABASE_URL!);
        connection.isConnected = db.connections[0].readyState;
        console.log("Successfully connected to the database");

    } catch (error) {
        console.error("DB Connection Failed", error);
    }
}

export default connectDb;
