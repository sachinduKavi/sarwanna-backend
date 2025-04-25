import express from "express";
import {authorization} from "../middleware/authorization";
import {fetchOrders, placeOrder, testing} from "../controllers/order";

const router = express.Router()

router.post('/placeOrder', authorization, placeOrder)

router.get('/testing', testing)

router.put('/getOrders', authorization, fetchOrders)

export default router;