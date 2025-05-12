"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inquiryRequest = void 0;
const sendInquiry_1 = require("../middleware/sendInquiry");
const inquiryRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Process variables
    let proceed = false, message = null, content = null, code = 200;
    try {
        const inquiry = req.body;
        yield (0, sendInquiry_1.sendCustomerInquiry)(inquiry);
        proceed = true;
        message = "Customer inquiry sent successfully.";
        code = 200;
    }
    catch (error) {
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
});
exports.inquiryRequest = inquiryRequest;
