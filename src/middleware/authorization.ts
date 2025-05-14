import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()

export function authorization(req: Request, res: Response, next: NextFunction) {
    // console.log('authorization', req.headers.authorization === process.env.BEARER_TOKEN)
    if(process.env.BEARER_TOKEN === req.headers.authorization) next();
    else {
        res.status(401).json({
            proceed: false,
            message: 'unauthorized access detected',
            content: null
        })
    }
}