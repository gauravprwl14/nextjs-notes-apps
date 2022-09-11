// import { connectToDatabase } from '@/api-lib/mongo/dbConnect';
import mongoose from "mongoose";
import { MongoClient, Db } from "mongodb";
import CONFIG from '@/api-lib/config'

// const { MONGO_URL, MONGO_DB_NAME } = process.env

const url = (CONFIG.database.connection!) || "";
let dbName = CONFIG.database.name;


let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

if (!url) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
    );
}

if (!dbName) {
    throw new Error(
        "Please define the MONGODB_DB environment variable inside .env"
    );
}




export const connectToMongoose = async () => {
    try {
        if (cachedDb) {
            return {
                db: cachedDb
            }
        }
        const db = await mongoose.connect(url);
        cachedDb = db;
        console.log("Connected to mongodb.");
        return {
            db
        }
    } catch (error) {
        console.error("Mongoose connection error.", error);
        throw new Error("Unable to connect to mongodb.");
    }
};


export default connectToMongoose

// export default async function connectToDatabase() {
//     // @ts-ignore
//     if (cachedClient && cachedDb) {
//         return { client: cachedClient, db: cachedDb };
//     }
//     const client = await MongoClient.connect(url);
//     const db = await client.db(dbName);
//     cachedClient = client;
//     cachedDb = db;
//     return { client, db };
// }