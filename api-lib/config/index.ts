const { MONGO_URL } = process.env

const CONFIG = {

    database: {
        connection: MONGO_URL || ""
    }
}

export default CONFIG