import { Request, Response } from "express";
import { createHash } from "../middleware/hashing";
import AdminServices from "../db/services/Admin";



const loginAttempt = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        content = await AdminServices.loginAttempt(req.body)
        if(content) {
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


const changePassword = async (req: Request, res: Response)=>{
    let proceed = true, message = null, content = null
    try {
        content = await AdminServices.changePassword(req.body)
        if(content) {
            message = 'password changed successfully';
        }
        else message = 'error occured';
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

const updateProfileInfo = async (req: Request , res: Response )=>{
    let proceed = true, message = null, content = null
    try {
        content = await AdminServices.updateProfileInfo(req.body)
        if(content) {
            message = 'Profile updated successfully';
        }
        else message = 'error occurred';
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
    loginAttempt,
    changePassword,
    updateProfileInfo

}