const { MONGO_URL, MONGO_DB_NAME, NODE_ENV } = process.env
import { MongoClientOptions } from "mongodb";

const CONFIG = {

    database: {
        connection: (MONGO_URL! + MONGO_DB_NAME!) || "",
        name: MONGO_DB_NAME || "",
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as MongoClientOptions
    },
    nodeEnv: NODE_ENV
}

export default CONFIG