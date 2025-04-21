import Inquiry from "../models/Inquiry";
import {sendCustomerInquiry} from "../middleware/sendInquiry";
import { Request, Response } from "express";

const inquiryRequest = async (req: Request, res: Response) => {
    // Process variables
    let proceed: boolean = false,
        message: string | null = null,
        content: Object | null = null,
        code: number = 200;

    try {
        const inquiry: Inquiry = req.body;
        await sendCustomerInquiry(inquiry);
        proceed = true;
        message = "Customer inquiry sent successfully.";
        code = 200;
    } catch (error) {
        console.error("Error in customerRequest:", error);
        message = "Failed to send customer inquiry.";
        code = 500;
    }

    // Response to the client
    res.status(code).json({
        proceed,
        content,
        message
    });
};

export { inquiryRequest };
