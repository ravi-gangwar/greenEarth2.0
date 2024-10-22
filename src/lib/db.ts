import mongoose from 'mongoose'

type ConnectionObject = {
    isConnected : number;
}

const connection : ConnectionObject = {
    isConnected: 0
}


async function connectDb(): Promise<void>{
    if(connection.isConnected){
        console.log("already connected")
        return
    }

    try {        
        const db = await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URL!)
        connection.isConnected = db.connections[0].readyState
        console.log("connected")
    } catch (error) {
        console.log("DB FAIL", error);
    }
}

export default connectDb;