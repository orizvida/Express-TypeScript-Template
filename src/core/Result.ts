import { Response } from "express";
import { HTTP_RESPONSE, Res } from "./HttpContext";

export class Result {
    static sendResponse<T>(res:Response,data:T) : Res<T> {
         return res.status(HTTP_RESPONSE.OK).json(data)
    }
    static sendError<T>(res:Response,status:number,error:string|null) : Res<T>{
        return res.status(status).json({success:false,message:error});
    }

}