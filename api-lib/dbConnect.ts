import mongoose from 'mongoose'
import CONFIG from '@/api-lib/config'


interface IConn {
    conn: null | any;
    promise: null | any;
}



const MONGODB_URI = CONFIG.database.connection

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

// @ts-ignore
let cached: IConn = global.mongoose

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectToDatabase