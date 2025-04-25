import {Request, Response} from "express";
import {OrderService} from "../db/services/Order";

const placeOrder = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        await OrderService.placeOrder(req.body.customer, req.body.order, req.body.productList)
        message = "order Successfully saved"
    } catch (error) {
        message = "order not places";
        proceed = false
    }
    res.status(proceed ? 201 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}


const fetchOrders = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        content = await OrderService.fetchOrders(req.body)
    } catch(e) {
        proceed = false
        message = 'server error'
    }


    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}


const testing = async (req: Request, res: Response) => {
    console.log('testing running...')
    let proceed = true, message = null, content = null

    // OrderService.whatsAppMessage();

    res.status(proceed ? 201 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

export {
    placeOrder,
    testing,
    fetchOrders
}