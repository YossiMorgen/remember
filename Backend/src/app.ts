import express from "express";
import appConfig from "./2-utils/AppConfig";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import cors from "cors";
import CommemorativeController from "./6-controllers/commemorative-controllers/commemorative-controller";
import authController from "./6-controllers/auth-controller";
import productsController from "./6-controllers/products-controller";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import expressFileUpload from 'express-fileupload'

const server = express();

server.use(expressRateLimit({
    max: 70,
    windowMs: 1000,
    message: "Fuck Of "
}));

server.use(cors({ origin: appConfig.siteUrl } ));
server.use(helmet({
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
}));

server.use( express.json());

server.use(express.static('src/1-assets/images'))
server.use(express.urlencoded({ extended: false }));

server.use('/api', authController);


server.use(expressFileUpload());
server.use('/api', productsController);
server.use('/api', CommemorativeController);

server.use('*', routeNotFound);

server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening to http://localhost:${appConfig.port}`))