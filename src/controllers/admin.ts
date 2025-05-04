import { Request, Response } from "express";
import { createHash } from "../middleware/hashing";
import AdminServices from "../db/services/Admin";



const loginAttempt = async (req: Request, res: Response) => {
    let proceed = false, message = null, content = null

    try {
        console.log("login request",req.body)
        content = await AdminServices.loginAttempt(req.body)
        if(content) {
            proceed=true
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
    let proceed = false, message = null, content = null,status = false
    try {
        content = await AdminServices.changePassword(req.body)
        if(content) {
            message = 'password changed successfully';
            status = true
        }
        else message = 'password change failed';
    } catch(e) {
        proceed = false
        message = 'server error'
    }

    console.log(status,proceed,message,content)

    res.status(200).json({
        status: status,
        proceed: proceed,
        message: message,
        content: content
    })
}

const updateProfileInfo = async (req: Request , res: Response )=>{
    let proceed = false, message = null, content = null,status = false
    try {
        content = await AdminServices.updateProfileInfo(req.body)
        if(content) {
            status = true
            proceed = true
            message = 'Profile updated successfully';
        }
        else message = 'profile update failed';
    } catch(e) {
        proceed = false
        status = false
        message = 'server error'
    }

    console.log("response:",status,proceed,message,content)
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