import { MongoClient } from "mongodb";


const { MONGO_URL, MONGO_DB_NAME } = process.env

const url = (MONGO_URL!) || "";
let dbName = MONGO_DB_NAME;

// @ts-ignore
let cachedClient = null;
// @ts-ignore
let cachedDb = null;

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

export async function connectToDatabase() {
    // @ts-ignore
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }
    const client = await MongoClient.connect(url);
    const db = await client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}