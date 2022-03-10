import { Response } from "express";
import { Query, Send } from "express-serve-static-core";

export interface Req<H extends Headers,T extends Query, U,P> extends Express.Request {
    body: U
    query: T
    params:P
    headers:H
    
}
export interface Res<ResBody> extends Response {
    json: Send<ResBody | {error:string}, this>;
    
 }
 export interface ErrorResponse extends Response{
     json: Send<{error:string},this>
 }
 export const HTTP_RESPONSE = {
    OK : 200,
    BAD_REQUEST : 400,
    SERVER_ERROR : 500,
    NOT_FOUND : 404,
    UNAUTHORIZED : 401,
    FORBIDDEN : 403
 }