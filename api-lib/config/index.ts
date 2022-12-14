const { MONGO_URL, MONGO_DB_NAME, NODE_ENV } = process.env
import { MongoClientOptions } from "mongodb";
import Logger from '@/api-lib/utils/logger'

const CONFIG = {

    database: {
        connection: (`${MONGO_URL}/${MONGO_DB_NAME}`) || "",
        name: MONGO_DB_NAME || "",
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as MongoClientOptions
    },
    nodeEnv: NODE_ENV
}

Logger.debug('connectToMongoose', { database: CONFIG.database, ...CONFIG.database })

export default CONFIG