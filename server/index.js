import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'
import passport from 'passport'

import Configurations from './src/configurations/Configuration.js'
import UserRoutes from './src/routes/User.route.js'
import EquipmentRoutes from './src/routes/Equipment.route.js'
import Middlewares from './src/middlewares/Middleware.js'
import passportConfig from './src/configurations/passport-config.js'

const server = express();
server.use(passport.initialize())
server.use(cors({ credentials: true }));
server.use(express.json());
server.use(morgan('common'));
server.use(helmet());

/* passportConfig.registerUserini() */
passportConfig.login()

UserRoutes.routes(server);
EquipmentRoutes.routes(server);
server.use(Middlewares.notFound);

Configurations.connectToPort(server);
Configurations.connectToDatabase();

if (process.env.NODE_ENV === 'production') {
    server.use(express.static("../client/build"));
    server.get("*", (req, res) => {
        res.sendFile("../client/build/index.html");
    });
}

export default server;