import http from 'http';
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';
import pinoHTTP from 'pino-http';
import logger from './config/logger'
import config from './config/config';
import sampleRoute from './routes/sample';
import ExceptionMiddleware from './middleware/ExceptionMiddleware';
import { HTTP_RESPONSE } from './core/HttpContext';
import HttpException from './config/exceptions/HttpException';
dotenv.config();
const API_BASE = '/api';
const PORT = process.env.PORT || 1337
const NAMESPACE = 'Server';
const router = express();
const env = process.env.NODE_ENV;

/** Set up http logging */
    router.use(pinoHTTP({
        serializers: {
            req: (req) => ({
                id: req.id,
                method: req.method,
                url: req.url
            }),
            res: (res) => ({
                id: res.id,
                status: res.statusCode
            })
        },
        logger
        , genReqId: function (req) { return req.id }
    }));

/** Set up CORS policy */
let allowedOrigins:string[] = []
router.use(cors({
    credentials: true
    , exposedHeaders: [],
    origin: function (origin, callback) {
        // allow requests with no origin 
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var message = `The CORS policy for this origin doesn't ` +
                'allow access from the particular origin.';
            return callback(new HttpException(403, { message }), false);
        }
        return callback(null, true);
    }
}));

/** Set up static route */

router.use(express.static(path.resolve(__dirname, '../../client/build')));

/** Parse the body of the request */
router.use(express.urlencoded({
    extended: true,
    limit: '200mb'
}))
router.use((req, res, next) => {
    express.json({ limit: '200mb' })(req, res, next);
});


/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, itemsCount');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(HTTP_RESPONSE.OK).json({});
    }

    next();
});

/** Routes go here */
router.use(API_BASE, sampleRoute);

/** Error handling */
router.use(ExceptionMiddleware);
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});


const httpServer = http.createServer(router);
httpServer.listen(PORT, () =>
    logger.info(NAMESPACE, `Server is running ${config.server.hostname}:${PORT}`));

export default router;