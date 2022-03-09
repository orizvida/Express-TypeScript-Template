import { Response } from "express";
import { HTTP_RESPONSE } from "./HttpContext";

export class Result {
    static sendResponse<T>(res:Response,data:T) : void {
         res.status(HTTP_RESPONSE.OK).json(data)
         return;
    }
    static sendError(res:Response,status:number,error:string|null) : void{
        res.status(status).json({success:false,message:error});
        return;
    }

}