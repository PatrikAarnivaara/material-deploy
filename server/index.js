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
server.use(express.json());
server.use(passport.initialize())
server.use(morgan('common'));
server.use(helmet());
server.use(cors({ credential: true }));

/* passportConfig.registerUserini() */
passportConfig.login()

UserRoutes.routes(server);
EquipmentRoutes.routes(server);
server.use(Middlewares.notFound);


Configurations.connectToPort(server);
Configurations.connectToDatabase();


server.use(express.static("../client/build"));
server.get("*", (req, res) => {
    res.sendFile("index.html");
});


export default server;