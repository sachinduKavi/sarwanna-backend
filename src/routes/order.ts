import express from "express";
import {authorization} from "../middleware/authorization";
import {placeOrder} from "../controllers/order";

const router = express.Router()

router.post('/placeOrder', authorization, placeOrder)

export default router;