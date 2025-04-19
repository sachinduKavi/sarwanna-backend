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

export {
    placeOrder,
}