import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const { DEV_DATABASE_URL,
    PROD_DATABASE_URL, PORT,
    ENVIRONMENT } = process.env

const connectToPort = async (server) => {
    try {
        await server.listen(PORT, () => {
            console.log(`✔️  SERVER IS RUNNING ON PORT: ${PORT}`)
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

const buildFrontendInProduction = (server) => {
    if (process.env.NODE_ENV === 'production') {
        server.use(express.static("../client/build"));
        server.get("*", (req, res) => {
            res.sendFile("../client/build/index.html");
        });
    }
}

export default {
    connectToPort,
    connectToDatabase,
    buildFrontendInProduction
}