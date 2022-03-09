import { NextFunction, Request, Response } from 'express';
import HttpException from '../config/exceptions/HttpException';
import logger from '../config/logger';
import { HTTP_RESPONSE } from '../core/HttpContext';
import { Result } from '../core/Result';


const dev = process.env.NODE_ENV === 'development';
const PROD_MESSAGE = 'Something went wrong, We are looking into it';
async function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
        console.log(error)
        return Result.sendError(response,error.status || HTTP_RESPONSE.BAD_REQUEST, error.error.message );
   
}

export default errorMiddleware;