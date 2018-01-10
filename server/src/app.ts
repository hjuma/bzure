import AssetRouter from './routes/asset';
import FacilityRouter from './routes/facility';
import DataQualityRouter from './routes/data-quality';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import BarrierRouter from './routes/barrier';
import LoginRouter, { loginRoutes } from './routes/login';
import RSARouter from './routes/rsa';
import RuleSetRouter from "./routes/rule-set";
import UserRouter from "./routes/user";
import ReferenceDataRouter from "./routes/reference-data";

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            if ('OPTIONS' == req.method) {
                res.send(200);
            } else {
                next();
            }
        });

        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Nothing here to see'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/assets', loginRoutes.verifyToken, AssetRouter);
        this.express.use('/api/v1/users', loginRoutes.verifyToken, UserRouter);
        this.express.use('/api/v1/facilities', loginRoutes.verifyToken, FacilityRouter);
        this.express.use('/api/v1/barriers', loginRoutes.verifyToken, BarrierRouter);
        this.express.use('/api/v1/rule-set', loginRoutes.verifyToken, RuleSetRouter);
        this.express.use('/api/v1/reference-data', loginRoutes.verifyToken, ReferenceDataRouter);
        this.express.use('/api/v1/login', LoginRouter);
        this.express.use('/api/v1/rsa', RSARouter);
    }
}

export default new App().express;