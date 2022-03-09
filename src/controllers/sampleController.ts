import { NextFunction, Request, Response } from 'express';
import HttpException from '../config/exceptions/HttpException';
import { ErrorResponse, HTTP_RESPONSE, Req, Res } from '../core/HttpContext';
import { Result } from '../core/Result';
import Sample from '../interfaces/sample';


const NAMESPACE = 'sample';


const sampleFunction = async (req: Req<any,{ id: string }, Sample, { id: number }>, res: Res<Sample>, next: NextFunction) => {
    try {
        console.log(req.headers.authorization);
        const sampleResponse = {
            id: Number(req.params.id),
            name: req.body.name
        } as Sample;

        /* ---- Simulate runtime exception to check error middleware ----

          let s:any = 'simulate runtime exception';
          s.s = 'simulate runtime exception';*/

        // Simulate expected error (Bad request)
        if (req.body.name === 'error') {
            return Result.sendError(res,HTTP_RESPONSE.BAD_REQUEST, 'Error!');
        }
        return Result.sendResponse<Sample>(res, sampleResponse);
    }
    catch (err:any) {
        next(new HttpException(err.status,err));
    }

};




export {
    NAMESPACE,
    sampleFunction
};