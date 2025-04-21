import nodemailer from 'nodemailer';
import Inquiry from "../models/Inquiry";


const transporter = nodemailer.createTransport({
    host: "mail.softdetroits.com",
    port: 587,
    auth: {
        user: "info@softdetroits.com",
        pass: "detroits123",
    },
})



const sendCustomerInquiry = async (inquiry:Inquiry) => {
    const info = await transporter.sendMail({
        from: 'sysadmin@sabariholdings.com',
        to: 'info@softdetroits.com',
        subject: 'New Inquiry Inquiry',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Customer Contact Information</title>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
            body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f7fc;
            color: #333;
            line-height: 1.5;
            }

            .a4-container {
            width: 210mm;
            height: 297mm;
            margin: 20mm auto;
            background: #ffffff;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow-y: auto;
            padding: 20px;
            font-family: 'Roboto', sans-serif;
            }

            .header {
            text-align: center;
            margin-bottom: 30px;
            }

            .header h1 {
            font-size: 32px;
            font-weight: 700;
            color: #004d99;
            margin-bottom: 15px;
            }

            .header p {
            font-size: 16px;
            color: #555;
            margin-top: 0;
            }

            .section-title {
            font-size: 20px;
            color: #004d99;
            margin-bottom: 15px;
            font-weight: 600;
            display: flex;
            align-items: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
            }

            .section-title::before {
            content: '📝';
            margin-right: 10px;
            }

            .contact-info {
            margin-bottom: 20px;
            }

            .contact-info table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            }

            .contact-info td {
            padding: 10px;
            vertical-align: top;
            }

            .contact-info td:first-child {
            font-weight: 600;
            color: #555;
            width: 30%;
            }

            .contact-info td:last-child {
            color: #333;
            }

            .contact-info td i {
            color: #004d99;
            margin-right: 10px;
            }

            .message-box {
            background-color: #f9f9f9;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            color: #333;
            margin-bottom: 30px;
            }

            .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #004d99;
            color: white;
            text-align: center;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s ease;
            margin: 20px 0;
            }

            .button:hover {
            background-color: #0066cc;
            }

            .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #ddd;
            padding-top: 15px;
            }

            .footer p {
            margin: 5px 0;
            }

            .footer a {
            color: #004d99;
            text-decoration: none;
            font-weight: 600;
            }

            .scrollable {
            max-height: calc(100% - 60px);
            overflow-y: auto;
            }

            .contact-info table td, .message-box {
            border-bottom: 1px solid #f0f0f0;
            }

            .contact-info table td:last-child {
            border-bottom: none;
            }

        </style>
        </head>
        <body>
        <div class="a4-container">
            <div class="scrollable">
            
            <div class="header">
                <h1>Customer Contact Information</h1>
                <p>Submitted via the Online Contact Form</p>
            </div>

            
            <div class="contact-info">
                <div class="section-title">
                <i class="fas fa-user"></i>&nbsp; Contact Details
                </div>
                <table>
                <tr>
                    <td><i class="fas fa-user-circle"></i> First Name:</td>
                    <td>${inquiry.name}</td>
                </tr>
                
                <tr>
                    <td><i class="fas fa-envelope"></i> Email:</td>
                    <td>${inquiry.email}</td>
                </tr>
                <tr>
                    <td><i class="fas fa-phone-alt"></i> Phone Number:</td>
                    <td>${inquiry.phoneNumber}</td>
                </tr>
                <tr>
                    <td><i class="fas fa-phone-alt"></i> Subject:</td>
                    <td>${inquiry.subject}</td>
                </tr>
                </table>
            </div>

            
            <div class="message-box">
                <div class="section-title">
                <i class="fas fa-comments"></i>&nbsp; Message
                </div>
                <p>${inquiry.message}</p>
            </div>

        
            <div style="text-align: center;">
                <a href="mailto:${inquiry.email}" class="button" style="color: white">
                <i class="fas fa-reply"></i> Reply to Customer
                </a>
            </div>

            
            <div class="footer">
                <p>This message is auto-generated. Please do not reply directly to this email.</p>
                <p>For further inquiries, contact us at <a href="mailto:info@softdetroits.com">info@softdetroits.com</a></p>
            </div>
            </div>
        </div>
        </body>
        </html>
        `
    })

}


export {sendCustomerInquiry}