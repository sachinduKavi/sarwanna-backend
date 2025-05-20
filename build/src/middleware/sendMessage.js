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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCustomerOrderConfirmation = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// const transporter = nodemailer.createTransport({
//     host: "mail.softdetroits.com",
//     port: 465,
//     auth: {
//         user: "info@softdetroits.com",
//         pass: "detroits123", // App password
//     },
// });
const transporter = nodemailer_1.default.createTransport({
    host: "mail.saravanaflora.lk",
    port: 465,
    auth: {
        user: "admin@saravanaflora.lk",
        pass: "H?(rP!UFLyC%",
    },
});
const sendCustomerOrderConfirmation = (customerData, productListData) => __awaiter(void 0, void 0, void 0, function* () {
    const total = productListData.reduce((sum, item) => {
        return sum + (parseFloat(item.unitPrice) * parseInt(item.qty));
    }, 0);
    try {
        const info = yield transporter.sendMail({
            from: 'admin@saravanaflora.lk',
            to: customerData.email,
            subject: 'New Inquiry Inquiry - Flower Shop',
            html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <title>Order Confirmation - Sarwana Flora</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f9f4f1;
                                margin: 0;
                                padding: 0;
                                color: #444;
                            }
                            .container {
                                width: 100%;
                                max-width: 800px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                                border-radius: 8px;
                            }
                            .header {
                                text-align: center;
                                padding: 20px;
                                background-color: #f0e6f6;
                                border-radius: 8px;
                            }
                            .header h1 {
                                color: #9b58b0;
                                margin-bottom: 10px;
                            }
                            .section-title {
                                font-size: 18px;
                                font-weight: bold;
                                color: #9b58b0;
                                margin-top: 30px;
                                border-bottom: 2px solid #f48fb1;
                                padding-bottom: 5px;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 10px;
                            }
                            table td, table th {
                                border: 1px solid #ccc;
                                padding: 10px;
                                text-align: left;
                                color: black;
                            }
                            .product-table th {
                                background-color: #f0e6f6;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 30px;
                                padding-top: 20px;
                                font-size: 12px;
                                color: #999;
                                border-top: 1px solid #ddd;
                            }
                            .footer a {
                                color: #9b58b0;
                                text-decoration: none;
                                font-weight: bold;
                            }
                        </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Order Confirmation - Sarwana Flora</h1>
                                    <p>Thank you for your order! We will get back to you shortly.</p>
                                </div>
                        
                                <div class="section-title">Customer Details</div>
                                <table>
                                    <tr>
                                        <td><strong>First Name:</strong></td>
                                        <td>${customerData.name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email:</strong></td>
                                        <td>${customerData.email}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Phone Number:</strong></td>
                                        <td>${customerData.mobileNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Address:</strong></td>
                                        <td>${customerData.address}</td>
                                    </tr>
                                </table>
                        
                                <div class="section-title">Product List</div>
                                <table class="product-table">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${productListData.map((item) => `
                                            <tr>
                                                <td>${item.name}</td>
                                                <td>${item.qty}</td>
                                                <td>${item.unitPrice}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2" style="text-align: right; font-weight: bold;">Total</td>
                                            <td style="font-weight: bold;">${total.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                        
                                <div class="footer">
                                    <p>This message is auto-generated. Please do not reply directly to this email.</p>
                                    <p>For further inquiries, contact us at <a href="mailto:info@softdetroits.com">info@softdetroits.com</a></p>
                                </div>
                            </div>
                        </body>
                        </html>`
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.sendCustomerOrderConfirmation = sendCustomerOrderConfirmation;
