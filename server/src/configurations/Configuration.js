import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const { DEV_DATABASE_URL,
    PROD_DATABASE_URL,
    ENVIRONMENT } = process.env

const connectToPort = async (server) => {
    try {
        await server.listen(process.env.PORT || 3001, () => {
            console.log(`✔️ SERVER RUNNING ON ${3001}`);
        })
    } catch (error) {
        console.error(`❌  ERROR OCCURED WHILE CONNECTING TO ${3001}`)
    }
}

const connectToDatabase = async () => {
    const DATABASE_URL = ENVIRONMENT === 'DEVELOPMENT' ? DEV_DATABASE_URL : PROD_DATABASE_URL
    try {
        await mongoose.connect(`${DATABASE_URL}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
        console.log(`✔️ CONNECTED TO DATABASE`);

    } catch (error) {
        console.error(`❌  ERROR OCCURED WHILE CONNECTING TO DATABASE`)
        process.exit()
    }
}

export default {
    connectToPort,
    connectToDatabase
}