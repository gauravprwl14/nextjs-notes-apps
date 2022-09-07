import { MongoClientOptions } from "mongodb";
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";
import CONFIG from '@/api-lib/config'

let client;
let mongoDBConnection;

if (!CONFIG.database.connection) {
    throw new Error("Please add your Mongo URI to .env or docker-compose.yaml");
}

if (CONFIG.nodeEnv === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).

    // todo global._mongoClientPromise
    //@ts-ignore
    if (!global._mongoClientPromise) {
        client = new MongoClient(CONFIG.database.connection, CONFIG.database.options);
        //@ts-ignore
        global._mongoClientPromise = client.connect();
    }
    //@ts-ignore
    mongoDBConnection = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(CONFIG.database.connection, CONFIG.database.options);
    mongoDBConnection = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongoDBConnection as Promise<MongoClient>;