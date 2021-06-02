import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import mongoose from 'mongoose';

dotenv.config()
const { DEV_DATABASE_URL,
    PROD_DATABASE_URL, PORT,
    ENVIRONMENT, EMAIL,
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN, } = process.env

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

const sendEmail = async (databaseResponse, token) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN
        }
    })

    const mailOptions = {
        from: 'patrikaarnivaara@gmail.com',
        to: `${databaseResponse.email}`,
        subject: 'Link To Reset Password',
        text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3000/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    }

    console.log(`SENDING EMAIL TO: ${databaseResponse.email}`)

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error('there was an error: ', error)
        } else {
            console.log('here is the response: ', response)
            response.status(StatusCode.OK).send(response)
        }
    })

}

export default {
    connectToPort,
    connectToDatabase,
    sendEmail
}