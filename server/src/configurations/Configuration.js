import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const { DEV_DATABASE_URL,
    PROD_DATABASE_URL, PORT,
    ENVIRONMENT } = process.env

    const connectToPort = async (server) => {
        try {
            await server.listen(PORT || 3001, () => {
                console.log(`✔️  SERVER IS RUNNING ON PORT: ${PORT || 3001}`)
            })
        } catch (error) {
            console.log('❌  ERROR OCCURED WHILE TRYING TO CONNECT TO THE PORT..')
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