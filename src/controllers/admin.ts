import { Request, Response } from "express";
import { createHash } from "../middleware/hashing";
import AdminServices from "../db/services/Admin";



const loginAttempt = async (req: Request, res: Response) => {
    let proceed = false, message = null, content = null

    try {
        content = await AdminServices.loginAttempt(req.body)
        if(content) {
            proceed = true
            message = 'login success';
        }
        else message = 'invalid username or password';
    } catch(e) {
        proceed = false
        message = 'server error'
    }
    

    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    })
}


export {
    loginAttempt
}