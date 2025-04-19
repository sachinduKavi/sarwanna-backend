import { Request, Response } from "express";
import db from "../db/database";
import {order} from "../db/schema";
import {OrderService} from "../db/services/Order";

const placeOrder=async (req:Request, res:Response) => {
    let proceed = true, message = null, content = null

    try {
        console.log("111111111111111")
        await OrderService.placeOrder(req.body.customer,req.body.order,req.body.productList)

    }catch(error){
        console.log(error)
        message = "order not places";
        proceed = false
    }
    res.status(proceed?201:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

export {
    placeOrder,
}