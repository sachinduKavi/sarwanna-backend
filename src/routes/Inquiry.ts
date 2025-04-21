import express from "express";
import {authorization} from "../middleware/authorization";
import {inquiryRequest} from "../controllers/Inquiry";

const router = express.Router()

router.post('/sendInfo', authorization, inquiryRequest)

export default router;