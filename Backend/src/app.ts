import express from "express";
import appConfig from "./2-utils/AppConfig";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import cors from "cors";
import CommemorativeController from "./6-controllers/commemorative-controllers/commemorative-controller";
import candlesController from "./6-controllers/commemorative-controllers/candles-controller";
import flowersController from "./6-controllers/commemorative-controllers/flowers-controller";
import deceaseImagesController from "./6-controllers/commemorative-controllers/decease-images-controller";
import commemorationSiteController from "./6-controllers/commemorative-controllers/commemoration-site-controller";
import storyController from "./6-controllers/commemorative-controllers/story-controller";
import authController from "./6-controllers/auth-controller";
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
server.use('/api', storyController);
server.use('/api', candlesController);
server.use('/api', flowersController);



server.use(expressFileUpload());
server.use('/api', deceaseImagesController);
server.use('/api', CommemorativeController);
server.use('/api', commemorationSiteController);

server.use('*', routeNotFound);

server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening to http://localhost:${appConfig.port}`))